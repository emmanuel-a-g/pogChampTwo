const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.challonge.com/v1/tournaments';
const { api_key } = require('./config.js');
//no saving to database
//const { insertTournamentInfo, updateUserInfo, updateTournament, findTournament, findUserByName, findUserById, updateWinner, topFiveEarners, topFiveWinners, topFiveRatio } = require('../../db/index.js');
//console.log('api key:', api_key);


router.post('/postParticipant', (req, res) => {
  console.log('posting new participants');
  let body = req.body;
  let result = null;
  let tournamentId = body.tournamentId;
  let participants = { "participants": body.participants };
  axios.post(`${baseUrl}/${tournamentId}/participants/bulk_add.json?api_key=${api_key}`, participants)
    .then((result) => {
      result = result.data;
      // console.log(result, "posted participants");
      res.send(result);
    })
    .catch((err) => {
      res.send(404).json({message: "Error posting participants, try again!"});
      console.log("Error posting participants:", err);
    })
    // .then(() => {
      // let arr = [];
      // let count = 0;
      // body.participants.map((username, i) => {
      //   new Promise((resolve, reject) => {
      //     updateUserInfo(username.name, tournamentId)
      //       .then((data) => {
      //         resolve(data)
      //       })
      //       .catch((err) => {
      //         reject(err);
      //       })
      //   })
      //     .then((result) => {
      //       count++;
      //       if (count === body.participants.length) {
      //         if (result !== null) {
      //           arr.push(result.userId);
      //         }
      //         updateTournament(tournamentId, arr)
      //           .then((result2) => {
      //             console.log(result2);
      //           })
      //           .catch((err) => {
      //             console.log(err);
      //           })
      //       } else if (result !== null && count !== body.participants.length) {
      //         arr.push(result.userId)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
      // })
    // })
})

router.post('/createTournament', (req, res) => {
  let body = req.body.data;
  let obj = { "name": body.name, "description": body.description };
  // console.log(obj, 'THIS IS THE OBJJJJJJJ');
  let tournamentId = null;
  let Url = null;
  axios.post(`${baseUrl}.json?api_key=${api_key}`, obj)
    .then((result) => {
      tournamentId = result.data.tournament.id;
      Url = result.data.tournament.id;
      res.send(result.data);
    })
    .then(() => {
      req.body.form.name = body.name;
      req.body.form.tournamentId = tournamentId;
      req.body.form.Url = Url;

      // insertTournamentInfo(req.body.form)
      //   .then((res) => {
      //     console.log('SEEDED TOURNAMENT')
      //   })
      //   .catch((err) => {
      //     console.log("There was an error seeding");
      //   })
    })
    .catch((error) => {
      console.log("Error creating new tournament", error)
    })
})

router.post('/startTournament', (req, res) => {
  // console.log('Start tournament');
  axios.post(`${baseUrl}/${req.body.tournamentId}/start.json?api_key=${api_key}`)
    .then((result) => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log('Erorr starting Tournament', err)
    })
})

router.post('/updateMatch', (req, res) => {
  // console.log("Updating Winner");
  let { participant_id, tournament_id } = req.body;

  axios.get(`${baseUrl}/${tournament_id}/matches.json?api_key=${api_key}&state=open&participant_id=${participant_id}`)
    .then((result) => {
      let obj = { match: {} };
      let loserId = '';
      let match_id = result.data[0]["match"]["id"];
      let player_one = result.data[0]["match"]["player1_id"];
      let player_two = result.data[0]["match"]["player2_id"];
      if (player_one === participant_id) {
        obj["match"]["scores_csv"] = "1-0";
        loserId = player_two;
      } else {
        obj["match"]["scores_csv"] = "0-1";
        loserId = player_one;
      }
      obj["match"]["winner_id"] = participant_id;
      // console.log('loserid:', loserId);
      axios.put(`${baseUrl}/${tournament_id}/matches/${match_id}.json?api_key=${api_key}`, obj)
        .then((result) => {
          res.send({ "loserId": loserId });
        })
        .catch((err) => {
          console.log('Error posting winner', err)
        })
    })
    .catch((err) => {
      console.log("Error getting match id", err);
    })
})

router.put('/finalizeTournament', (req, res) => {
  let id = req.body.tournamentId;
  axios.post(`${baseUrl}/${id}/finalize.json?api_key=${api_key}`)
    .then((result) => {
      console.log('Finalized tournament');
      res.status(200).end();
    })
    .catch((err) => {
      console.log("Error finalizing tournament:", err);
    })
})

router.post('/declareWinner', (req, res) => {
  console.log(req.body, 'this is on declare winner');
  let { tournamentId, username, winnings } = req.body;
  // updateWinner(tournamentId, username, winnings)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((error) => {
  //     console.log('this is the error', error);
  //   })
})
let players = [{
  "_id" : "5fa5baebafad33b2d8266305",
  "name" : "michael",
  "password" : {
    "hashed" : "12sxv84nvjr5",
    "salt" : "3fiv455uanbr"
  },
  "userId" : 11,
  "attended" : [ ],
  "upcoming" : [ ],
  "wins" : 10,
  "losses" : 350,
  "winnings" : 2000
}, 
{
  "_id" : "5fa5baebafad33b2d8266306",
  "name" : "steve",
  "password" : {
    "hashed" : "12sx4t466w3245",
    "salt" : "3fi5uhvnbr"
  },
  "userId" : 10,
  "attended" : [
    {
      "name" : "My Previous Tournament",
      "prize" : "200",
      "game" : "Minecraft",
      "location" : "Houston basement"
    }
  ],
  "upcoming" : [ ],
  "wins" : 1,
  "losses" : 420,
  "winnings" : 100
},
{
  "_id":"5fa5baebafad33b2d8266307",
  "name" : "damon",
  "password" : {
    "hashed" : "2h49h98vnvn",
    "salt" : "rijvn45g98bunbw"
  },
  "userId" : 12,
  "attended" : [
    {
      "name" : "My Previous Tournament",
      "prize" : "200",
      "game" : "Minecraft",
      "location" : "Houston basement",
      "date" : "someday in Nov",
      "type" : "bracket"
    },
    {
      "name" : "Previous tournament three",
      "prize" : "100000",
      "game" : "Modern Warfare",
      "location" : "Lakehouse",
      "date" : "in Decemeber"
    }
  ],
  "upcoming" : [
    {
      "name" : "Tournament Name",
      "prize" : "1000",
      "game" : "Call of Duty Five",
      "location" : "New York Basement",
      "date" : "in Sep"
    },
    {
      "name" : "Tournament NameTwo",
      "prize" : "20000",
      "game" : "Mario Bros",
      "location" : "Austin basement headquarters",
      "date" : "Nov,14,2021"
    },
    {
      "name" : "Tournament Three",
      "prize" : "3050",
      "game" : "Mario",
      "location" : "Dallas basement",
      "date" : "Sep,21,2020"
    }
  ],
  "wins" : 5,
  "losses" : 350,
  "winnings" : 200
}]
//john keanu neo michael blue biden trump
router.get('/top', (req, res) => {
  let result = {};
  result.earners = players.sort((a, b) => b.winnings - a.winnings);
  result.winners = players.sort((a, b) => b.wins - a.wins);
  result.ratio = players.sort((a, b) => b.wins / b.losses - a.wins / a.losses);
  res.status(200).json(result);
  return;
  // let result = {};
  // topFiveEarners()
  // .then((data) => {
  //   result.earners = data;
  //   topFiveWinners()
  //   .then((data2) => {
  //     result.winners = data2;
  //     topFiveRatio()
  //     .then((data3) => {
  //       result.ratio = data3;
  //       res.send(result);
  //     })
  //   })
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then(() => {
  //   topFiveWinners()
  //   .then((data2) => {
  //     // console.log(data2);
  //     // result.winners = data2;
  //     winners = data2;
  //   })
  //   .catch((err2) => {
  //     console.log(err2)
  //   })
  // })
  // .then(() => {
  //   topFiveRatio()
  //   .then((data3) => {
  //     // console.log('this is the ratio data', data3);
  //     // result.ratio = data3;
  //     ratio = data3;
  //   })
  //   .catch((err3) => {
  //     console.log(err3)
  //   })
  // })
  // .then(() => {
  //   // if(Object.keys(result).length === 2) {
  //     // console.log("this is the result oBJBJBJ", result, Object.keys(result).length);
  //   //   res.send(result);
  //   // }
  //   console.log("EARNERS", earners, "WINNERS", winners, "RATIO", ratio);
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
})


module.exports = router;