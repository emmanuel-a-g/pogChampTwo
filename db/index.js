const { call } = require('file-loader');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const {saltNhash } = require ('../server/security/index.js')

// connection url -- TODO: update with deployed url
const url = 'mongodb://localhost:27017';

// database name
const dbName = 'pogchamp';

// create a new client
const client = new MongoClient(url, { useUnifiedTopology: true });

// create a connection
client.connect((err, result) => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
});

// reference the db
const db = client.db(dbName);

/*
                             ,--.
 ,---. ,--.,--. ,---. ,--.--.`--' ,---.  ,---.
| .-. ||  ||  || .-. :|  .--',--.| .-. :(  .-'
' '-' |'  ''  '\   --.|  |   |  |\   --..-'  `)
 `-|  | `----'  `----'`--'   `--' `----'`----'
   `--'
*/


// get new tournament id
const getNewTournamentId = (callback) => {
  db.collection('utility').find({}).toArray((err, result) => {
    if (err) {
      console.log(err)
    } else {
      let id = result[0]["tournamentId"];
      callback(id);
    }
  });
}

// get new user id
const getNewUserId = (callback) => {
  db.collection('utility').find({}).toArray((err, result) => {
    if (err) {
      console.log(err)
    } else {
      callback(result[0].userId);
    }
  });
}

// increment (for use after get)
const incrementTournamentId = (callback) => {
  db.collection('utility').updateOne({}, {$inc: {tournamentId: 1}})
  .then((res) => {callback(null, res.result);})
  .catch((err) => {callback(err);});
}

// increment (for use after get)
const incrementUserId = (callback) => {
  db.collection('utility').updateOne({}, {$inc: {userId: 1}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

// create new tournament
const createNewTournament = (name, hostName, gameName, location, city, type, playerLimit, rounds, totalPrize, players, callback) => {
  getNewTournamentId((res) => {
    let date = new Date ();
    console.log( res, "<--new tournament id");
    db.collection('tournament').insertOne({name: name, tournamentId: res, hostName: hostName, gameName: gameName, date: date, location: location, city: city, type: type, rounds: rounds, totalPrize: totalPrize, players: players})
    .then((res) => {
      incrementTournamentId(callback);
    })
    .catch((err) => {
      callback(err, null);
    })
  });
}

// create new user
const createNewUser = (name, password, type) => {
  getNewUserId((res) => {
    let passNhash = saltNhash(password);
    if (type === 'organizer') {
    db.collection('users').insertOne({name: name, password: passNhash, userId: res, hosted: []})
    .then((res) => {
      incrementUserId(callback);
    })
    .catch((err) => {
      callback(err);
    })
    } else if (type === 'player') {
    db.collection('users').insertOne({name: name, password: passNhash, attended: [], wins: 0, losses: 0, winnings: 0})
    .then((res) => {
      incrementUserId(callback);
    })
    .catch((err) => {
      callback(err);
    })
    }
  });
}

// distribute winnings
const issueWinnings = (name, purse, callback) => {
  db.collection('users').updateOne({name: name}, {$inc: {winnings: purse}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

// TODO: queries to update tournament (check with LC about what specifically we want to update), queries to update user W/L (is this by points, by match, or by tournament?)


// handle winner
const handleWinner = (id, winner, callback) => {
  db.collection('tournament').updateOne({tournamentId: id}, {$set: {winner: winner}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

const upWins = (winner, callback) => {
  db.collection('users').updateOne({name: winner}, {$inc: {wins: 1}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

//COLLECTION NAMES user and tournament
//query to insert tournament info into tournament collection
const insertTournamentInfo = (obj) => {
  console.log(obj, "object to be inserted");
  return new Promise((resolve, reject) => {
    db.collection('tournament').insertOne(obj, (error, result) => {
      if (error) {
        console.log("error inserting", err);
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};


// UPDATES TOURNAMENT REGISTERED AND WINNER KEY TO USER ID
const updateTournament = (id, array) => {
  console.log(array);
  return new Promise((resolve, reject) => {
    let tournamentCollection = db.collection('tournament');
    tournamentCollection.updateOne({ "tournamentId": id }, { $set: { "registered": array } }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    })
  })
};

// UPDATE USERS ATTENDED
const updateUserInfo = (username, tournamentId) => {
  return new Promise((resolve, reject) => {
    let userCollection = db.collection('users');
    findUserByName(username)
      .then((data) => {
        if (data !== null) {
          userCollection.updateOne({ "name": username }, { $set: { "attended": [...data.attended, tournamentId] } }, (error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          })
        } else {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      })
  })
};


// FIND TOURNAMENT BY ID
const findTournament = (id) => {
  return new Promise((resolve, reject) => {
    db.collection('tournament', (err, collection) => {
      if (err) {
        reject(err);
      } else {
        collection.findOne({ "tournamentId": id }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      }
    })
  })
};

// FIND USER BY NAME
const findUserByName = (str) => {
  return new Promise((resolve, reject) => {
    db.collection('users', (err, collection) => {
      if (err) {
        reject(err);
      } else {
        collection.findOne({ "name": str }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      }
    })
  })
};


//query to insert guest to own collection
// const insertGuestInfo = (obj) => {
//   console.log(obj);
//   return new Promise ((resolve, reject) => {
//     db.collection('guest', (err, collection) => {
//       if (err) {
//         reject(err);
//       } else {
//         collection.insertOne(obj, (error, result) => {
//           if (error) {
//             reject(error)
//           } else {
//             resolve(result)
//           }
//         })
//       }
//     })
//   })
// };



// Query for userDashboard for both Player and Organizer
const getUserData = (username, callback) => {
  console.log(username,  "username receieved")
  db.collection('users').findOne({name: username}, (err, res)=> {
    if (err) {
      console.log("error:", err);
      callback(err, null);
    } else {
      console.log("query result", res)
      callback(null, res);
    }
  })
}

module.exports = {
  insertTournamentInfo,
  updateUserInfo,
  updateTournament,
  findTournament,
  findUserByName,
  getUserData,
  createNewTournament,
  createNewUser,
  issueWinnings,
  upWins,
  handleWinner
}
