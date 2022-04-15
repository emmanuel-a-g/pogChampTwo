import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Grid, Paper, Modal, TextField } from "@material-ui/core";
import BracketComponent from "./bracket/BracketComponent.jsx";
import Footer from "./Footer.jsx";
import LandingPage from "./LandingPage.jsx";
import Navigation from "./Navigation.jsx";
import OrganizerDashboard from "./OrganizerDashboard/OrganizerDashboard.jsx";
import PlayerDashboard from "./PlayerDashboard/PlayerDashboard.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import SwissController from "./swiss/SwissController.jsx";

const App = () => {
  const [login, showLogin] = React.useState(false);
  const [showName, setShowName] = React.useState(true);
  const [yourName, setName] = React.useState("");
  console.log(yourName);

  return (
    <Router>
      <div className="content">
        <div className="header">
          <Navigation handleLogin={showLogin} />
          <Login show={login} handleShow={showLogin} />
          <Name show={showName} handleShow={setShowName} yourName={yourName} setName={setName} />
          <ul className="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/player-dashboard">Player Dashboard</Link>
            </li>
            <li>
              <Link to="/organizer-dashboard">Organizer Dashboard</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/swiss">
            <SwissController />
          </Route>
          <Route path="/bracket">
            <BracketComponent />
          </Route>
          <Route path="/organizer-dashboard">
            <OrganizerDashboard yourName={yourName}/>
          </Route>
          <Route path="/player-dashboard">
            <PlayerDashboard yourName={yourName}/>
          </Route>
          <Route path="/signup">
            <SignUp handleModal={showLogin} />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};
const Name = ({ show, handleShow, yourName, setName }) => {
  //handle submit
  const body = (
    <div id="loginModal" style={{textAlign: "center"}}>
      <div>Hello, </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleShow(false);
      }}>
        <input
          value={yourName}
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "300px", margin: "5px" }}
        />
        <button
          type="submit"
          disabled={false}
          style={{ width: "100px", backgroundColor: "#ff7f28" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
  return (
    <div id="modalContainer">
      <Modal open={show} onClose={() => handleShow(false)}>
        {body}
      </Modal>
    </div>
  );
};
const Login = ({ show, handleShow }) => {
  const body = (
    <div id="loginModal">
      <SignIn closeModal={handleShow}/>
    </div>
  );
  return (
    <div id="modalContainer">
      <Modal open={show} onClose={() => handleShow(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default App;
