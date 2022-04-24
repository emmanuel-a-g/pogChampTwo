import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import TournamentHistory from "./TournamentHistory/TournamentHistory.jsx";
import "./OrganizerDashboard.css";
import "./TournamentHistory/TournamentHistory.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: 140,
    borderRadius: "5px",
    maxHeight: "200px",
  },
  username: {
    textAlign: "center",
  },
}));

const OrganizerDashboard = ({ yourName }) => {
  const [userData, setUserData] = useState({
    name: yourName ? yourName : "Client",
    upcoming: [
      {
        name: "Cool Fun Game Time",
        date: "11/18/2020",
        location: "The Basement",
      },
      {
        name: "Another Fun One",
        date: "11/25/2020",
        location: "The Basement II",
      },
    ],
    attended: [
      {
        name: "Super Fun Tournament",
        game: "Super Smash Bros",
        type: "Bracket",
        winner: "rapwnzel",
      },
      {
        name: "Big Words Tournament",
        game: "Scrabble",
        type: "Swiss",
        winner: "leSLAY",
      },
    ],
  });
  const [tournamentStyle, setTournamentStyle] = useState("");
  // useEffect(() => {
  //   getUserData();
  // }, [])

  const classes = useStyles();

  const handleTournamentStyleChange = (event) => {
    setTournamentStyle(event.target.value);
  };

  // const getUserData = () => {
  //   axios.get('/dashboard/player')
  //   .then((res) => {
  //     console.log('Getting Organizer data from DB');
  //     setUserData(res.data);
  //   })
  //   .catch((err)=> {
  //     console.log('Error geting organizer data', err)
  //   })
  // }

  return (
    <div id="playerContent">
      <div id="playerContentTopHalf">
        <div id="playerNameCard">
          <CardMedia
            className={classes.media}
            image="https://blog.playstation.com/tachyon/2019/11/ow2-featured.jpg?resize=1088,612&crop_strategy=smart&zoom=1"
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
          <h2 className={classes.username}>Tournament Selector</h2>
          <div id="selectorDiv">
            <Button variant="contained">
              <Link to="/bracket">Bracket</Link>
            </Button>
            <Button variant="contained">
              <Link to="/swiss">Swiss</Link>
            </Button>
          </div>
        </div>

        <div id="playerCardTournaments">
          {userData.name ? (
            <div style={{ all: "unset" }}>
              <h2>Upcoming Tournaments</h2>
              {userData.upcoming.map((tournament, index) => (
                <div key={index}>
                  <p>
                    {index + 1}: {tournament.name}
                  </p>
                  <p>
                    {index + 1}: {tournament.date}
                  </p>
                  <p>
                    {index + 1}: {tournament.location}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <TournamentHistory userData={userData} />
    </div>
  );
};

export default OrganizerDashboard;
