import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
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
function usePageViews() {
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(locatin.pathname);
  // }, [location])
  // return location;
}

const App = () => {
  // const location = useLocation();
  const [login, showLogin] = React.useState(false);
  const [showName, setShowName] = React.useState(true);
  const [yourName, setName] = React.useState("");
  // usePageViews();
  //  until solution it is removed
  // <Name show={showName} handleShow={setShowName} yourName={yourName} setName={setName} />
  console.log("User: ",yourName);

  return (
    <Router>
      <div className="content">
        <div className="header">
          <Navigation handleLogin={showLogin} />
          <Login show={login} handleShow={showLogin} />
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
    <div id="loginModal">
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
        />
        <button
          type="submit"
          disabled={false}
          style={{ backgroundColor: "#ff7f28", marginLeft: "5px"}}
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
