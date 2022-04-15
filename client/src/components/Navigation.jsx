import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../EXPWNENT.png';
import { Button } from '@material-ui/core';

const NavBar = ({ handleLogin }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 800;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div id="navigation" className="navBar">
        <Link to="/"><img id="logo" height={width < breakpoint ? "30px" : "50px"} src={Logo} /></Link>
        <Button id="signinButton" onClick={() => handleLogin(true)} variant="contained">sign in/sign up</Button>
    </div>
  )
}

export default NavBar;