import React from 'react';
import { Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const TournamentHistory = ({userData}) => {
  const classes = useStyles();

  return (
    <div id="tableHero">
      <h2 className="title">Hosted Tournaments</h2>
      <table id="theTable">
        <thead>
          <tr>
            <th>Tournament</th>
            <th>Game</th>
            <th>Tournament Style</th>
            <th align="right">Winner</th>
          </tr>
        </thead>
        <tbody>
        {userData.name ? userData.attended.map((tournament, index) =>
          <tr key={index}>
            <td>{tournament.name}</td>
            <td>{tournament.game}</td>
            <td>{tournament.type}</td>
            <td>{tournament.winner ? tournament.winner : "unknown"}</td>
          </tr>
        )
        : null}
        </tbody>
      </table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={(e) => {e.preventDefault(); console.log('Clicked once')} }>
          See more tournaments
        </Link>
      </div>
    </div>
  );
}

export default TournamentHistory;