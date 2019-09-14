import React, { Component } from 'react';
import Memory from './Memory';
import Signup from './Signup';
import Signin from './Signin';
import Logout from './Logout';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => <div>
<Router>
      <NavBar>
            <Link to="/">Memories</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Logout/>

        <hr />
        </NavBar>

        <Route exact path="/" component={Memory} />
        <Route path="/register" component={Signup} />
        <Route path="/login" component={Signin} />


    </Router>
  </div>;
export default App;
