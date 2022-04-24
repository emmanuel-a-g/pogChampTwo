import React, {useState} from "react";
import "./LiveTournament.css";
import { Button } from "@material-ui/core";

function LiveTournament({ players, prizes, live_image_url, winners }) {
  const [total, setTotal] = useState(null);
  if (players.length && total === null) {
    setTotal(players.length);
  }
  let thirdPlaceAmount = Math.floor(prizes.third / 2);
  const openInNewTab = (e) => {
    e.preventDefault();
    let url = live_image_url;
    const newWindow = window.open(url, "_blank", "noopener, noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <React.Fragment>
      <h1 className="title">Bracket Tournament</h1>
      <br />
      <div className="divBracket">
        {players.length === total && (
          <span>
            Instructions: click any player's name to move him up the tournament
          </span>
        )}
        {live_image_url && players.length >= 1 && (
          <span>
            {players.length === 1 && (
              <Button
                id="buttonBracket"
                type="submit"
                variant="outlined"
                onClick={() => window.print()}
                size="small"
              >
                Print Results
              </Button>
            )}
            <Button
              id="buttonBracket"
              type="submit"
              variant="outlined"
              onClick={(e) => openInNewTab(e)}
              size="small"
            >
              Print Bracket
            </Button>
          </span>
        )}
      </div>

      {players.length === 1 ? (
        <div>
          <h3>
            1st: {winners.first.participant.name.toUpperCase()} ${prizes.first}
          </h3>
          <h3>
            2nd: {winners.second.participant.name.toUpperCase()} ${prizes.second}
          </h3>
          <h3>
            3rd: {winners.third[0].participant.name.toUpperCase()} ${thirdPlaceAmount} AND{" "}
            {winners.third[1].participant.name.toUpperCase()} ${thirdPlaceAmount}
          </h3>
        </div>
      ) : null}

      {players.length === 0 ? (
        <div style={{ height: 550 }}>
          <h4 style={{ color: "grey", textAlign: "center" }}>
            Click "create-new-tournament" above to begin!
          </h4>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default LiveTournament;
