import React, { useState, useRef } from "react";
import {
  Button,
  Container,
  Grid,
  FormControl,
  TextField
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const BracketForm = ({ startTournament, fillFormError, resetDone }) => {
  const [bracketDetails, setBracketDetails] = useState({
    tournamentName: "",
    description: "",
    gameName: "",
    numberOfPlayers: 0,
    prizeAmount: 0,
    show: false,
  });

  const [playersInTournament, setPlayers] = useState({
    participants: [],
  });

  const [repeat, setRepeat] = useState({repeat: false});
  const [max, setMax] = useState(false);

  const playerName = useRef(null);
  const tournament = useRef(null);
  const game = useRef(null);
  const players = useRef(null);
  const prize = useRef(null);
  const description = useRef(null);

  if (fillFormError && bracketDetails.name) {
    setBracketDetails({ 
    tournamentName: "",
    description: "",
    gameName: "",
    numberOfPlayers: 0,
    prizeAmount: 0,
    show: false})
    resetDone();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(players.current.value) > 18) {
      alert("Only up to 18 players please!")
      return;
    }

    setBracketDetails({
      tournamentName: tournament.current.value,
      gameName: game.current.value,
      numberOfPlayers: players.current.value,
      prizeAmount: prize.current.value,
      description: description.current.value,
      show: true,
    });

    tournament.current.value = "";
    game.current.value = "";
    players.current.value = "";
    prize.current.value = "";
    description.current.value = "";
  };

  const handleAddingPlayers = (e) => {
    e.preventDefault();

    let incomingPlayer = playerName.current.value;
    let repeats = playersInTournament.participants.filter(function (
      player
    ) {
      return player.name === incomingPlayer;
    });

    if(repeats.length === 1) {
      // alert('Player is already in the list!')
      setRepeat({repeat: true})
    } else {
      setRepeat({repeat: false});
      setPlayers({
        participants: [...playersInTournament.participants, { name: incomingPlayer }],
      });
      if (playersInTournament.participants.length === 18) {
        setMax(true);
      }
    }
    playerName.current.value = "";
  };

  const deletePlayers = (e, name) => {
    e.preventDefault();

    let deletePlayer = name;
    let filteredPlayers = playersInTournament.participants.filter(function (
      player
    ) {
      return player.name !== deletePlayer;
    });

    setPlayers({ participants: filteredPlayers });
  };

  const handleTournament = (e) => {
    e.preventDefault();
    if (players.length <= 3) {
      alert("Need atleast 4 players to start tournament");
    } else {
      startTournament(bracketDetails, playersInTournament);
    }
  };

  return (
    <Container maxWidth="lg" className="bracketForm">
      {bracketDetails.show === false ? (
        ""
      ) : (
        <div>
          <h4>Tournament Name: {bracketDetails.tournamentName}</h4>
          <h4>Game Name: {bracketDetails.gameName}</h4>
          <h4>Number of Players: {bracketDetails.numberOfPlayers}</h4>
          <h4>Prize Amount: ${bracketDetails.prizeAmount}</h4>
        </div>
      )}

      <form autoComplete="off" onSubmit={handleSubmit} className="setup-form">
      <h3 className="title">Enter Bracket Information</h3>
        <TextField
          required
          label="tournament name"
          variant="filled"
          size="small"
          helperText="* required field"
          inputRef={tournament}
          focused
        />
        <TextField
          required
          label="game name"
          variant="filled"
          size="small"
          inputRef={game}
        />
        <TextField
          required
          label="# of players, 4-18"
          variant="filled"
          size="small"
          type="number"
          inputRef={players}
        />
        <TextField
          required
          label="prize amount"
          variant="filled"
          size="small"
          type="number"
          inputRef={prize}
        />
        <TextField
          required
          label="description"
          variant="filled"
          size="small"
          inputRef={description}
        />
        <Button type="submit" variant="contained" disabled={bracketDetails.show ? true : false}>
          Submit
        </Button>
      </form>

      <form
        autoComplete="off"
        onSubmit={handleAddingPlayers}
        className="setup-form"
        >
        {repeat.repeat === false ? null : <div>This player is already in the list!</div>}
        {max ? <span>Maximum players reached, delete or start tournament</span> : null}
        <TextField
          required
          type="text"
          label="player name"
          variant="filled"
          size="small"
          helperText="Minimum of 4 Players Required"
          inputRef={playerName}
        />
        <Button type="submit" variant="contained" disabled={max ? true : false}>
          Add Player
        </Button>
      </form>

      {playersInTournament.participants === [] ? (
        ""
      ) : (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="bracket-player"
            item
            xs={12}
          >
            {playersInTournament.participants.map((player, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <h4>{player.name} <DeleteForeverIcon
                    className="delete"
                    fontSize="small"
                    onClick={(e) => {
                      deletePlayers(e, player.name);
                    }}
                  /></h4>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <form noValidate autoComplete="off" className="setup-form">
        {playersInTournament.participants.length >= 4
        ?
        <Button
          type="submit"
          variant="contained"
          style={{display: "flex", flexDirection: "column"}}
          onClick={(event) => {
            handleTournament(event);
          }}
        >
          Start Tournament
        </Button>
        :
        <span style={{display: "flex", flexDirection: "column"}}>Please fill out!
        <Button type="submit" variant="outlined" disabled>
        Start Tournament
        </Button>
        </span>
      }
      </form>
    </Container>
  );
};

export default BracketForm;

