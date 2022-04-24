import React from "react";
import { Link} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./PlayerTournamentHistory.css";

//tournament name, game, date, location, city/state, type, outcome
// const rows = [
//   createData(0, 'Magic, The Gathering', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Swiss', 'Win'),
//   createData(1, 'Team Fortress 2', '07 Apr, 2019', 'Mothership Games', 'Austin, TX', 'Bracket', 'Win'),
//   createData(2, 'Starcraft 2', '12 Aug, 2019', 'Mage\'s Sanctum', 'Austin, TX', 'Swiss', 'Win'),
//   createData(3, 'Warhammer 40k', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Bracket', 'Win'),
//   createData(4, 'Super Smash Bros', '16 Mar, 2019', 'Josh\'s Couch', 'Austin, TX', 'Swiss', 'Win'),
// ];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PlayerTournamentHistory = ({ userData }) => {
  const classes = useStyles();

  return (
    <div id="tableHero">
      <h2 className="title">{userData.name}'s Tournament History</h2>
      <table id="theTable">
        <thead>
          <tr>
            <th>Tournament</th>
            <th>Game</th>
            <th>Date</th>
            <th>Location</th>
            <th>Tournament Style</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {userData.name
            ? userData.attended.map((tournament, index) => (
                <tr key={index}>
                  <td>{tournament.name}</td>
                  <td>{tournament.game}</td>
                  <td>{tournament.date}</td>
                  <td>{tournament.location}</td>
                  <td>{tournament.type}</td>
                  <td>
                    {tournament.result ? "Won" : "Lost"}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <div className={classes.seeMore}>
        <Link
          color="primary"
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          See more tournaments
        </Link>
      </div>
    </div>
  );
};

export default PlayerTournamentHistory;
