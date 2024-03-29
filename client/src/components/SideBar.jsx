import React from "react";
const SideBar = (props) => {
  return (
    <div id="sideBar">
      <Earners earners={props.topInfo.earners} />
      <Winners winners={props.topInfo.winners} />
      <Players players={props.topInfo.ratio} />
    </div>
  );
};

const Earners = (props) => {
  return (
    <div id="earners" className="sideBarItem">
      <h2 className="sideBarHeader">Top five earners:</h2>
      <hr></hr>
      {props.earners.map((earner, i) => {
        return (
          <p key={i}>
            {earner.name}: ${earner.winnings}
          </p>
        );
      })}
    </div>
  );
};

const Winners = (props) => {
  return (
    <div id="winners" className="sideBarItem">
      <h2 className="sideBarHeader">Top Five Winners:</h2>
      <hr></hr>
      {props.winners.map((winner, i) => {
        return (
          <p key={i}>
            {winner.name}: {winner.wins}
          </p>
        );
      })}
    </div>
  );
};

const Players = (props) => {
  return (
    <div className="sideBarItem">
      <h2 className="sideBarHeader">Top Five Players:</h2>
      <hr></hr>
      {props.players.map((player, i) => {
        return (
          <p key={i}>
            {player.name}: {player.wins}/{player.losses}
          </p>
        );
      })}
    </div>
  );
};
export default SideBar;
