import React, { useState, useEffect } from "react";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayerTournamentHistory from "./PlayerTournamentHistory/PlayerTournamentHistory.jsx";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: "flex",
  },
  username: {
    textAlign: "center",
  },
  media: {
    height: 140,
    borderRadius: "5px",
    maxHeight: "200px",
  },
  big: {
    color: "black",
  },
  small: {
    fontSize: ".75rem",
  },
});

const PlayerDashboard = ({ yourName }) => {
  const [userData, setUp] = useState({
    name: yourName ? yourName : "Client",
    attended: [
      {
        name: "My Previous Tournament",
        prize: "200",
        date: "09/15/2020",
        game: "Minecraft",
        location: "Houston basement",
        type: "Bracket",
      },
      {
        name: "Super Fun Tournament",
        prize: "100",
        date: "10/25/2020",
        game: "Magic the Gathering",
        location: "The Shop",
        type: "Swiss",
        result: true,
      },
    ],
    upcoming: [
      {
        name: "Smash Tournament",
        date: "11/13/2020",
        location: "Josh's backyard",
      },
    ],
    wins: 420,
    losses: 1,
    winnings: 1000,
  });
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 800;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const classes = useStyles();

  return (
    <div id="playerContent">
      <div id="playerContentTopHalf">
        <div id="playerNameCard">
          <CardMedia
            className={classes.media}
            image="https://cdn.gamer-network.net/2019/usgamer/Smash-Ultimate-Header-10.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/super-smash-bros-ultimate-review-12072018.jpg"
            title="Super Smash Bros"
          />
          <div id="nameText">
          <h3
          className={classes.username}
        >
          {userData.name ? userData.name : null}
        </h3>
          </div>
        </div>

        <div id="playerCardStats">
          <p>{userData.name ? userData.name : null}'s Stats</p>
          <p>Total Wins: {userData.wins ? userData.wins : null}</p>
          <p>Total Losses: {userData.losses ? userData.losses : null}</p>
          <p>Total Earnings: ${userData.winnings ? userData.winnings : null}</p>
        </div>

        <div id="playerCardTournaments">
          {userData.name ? (
            <div>
              <h2>Upcoming Tournaments</h2>
              {userData.upcoming.map((tournament, index) => (
                <div key={index}>
                  <p>{tournament.name ? tournament.name : null}</p>
                  <p>{tournament.date ? tournament.date : null}</p>
                  <p>{tournament.location ? tournament.location : null}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <PlayerTournamentHistory userData={userData} />
    </div>
  );
};

export default PlayerDashboard;
