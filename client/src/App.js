import React, { Component } from 'react';
import Memory from './Memory';
import Signup from './Signup';
import Signin from './Signin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => <div>
<Router>
      <div>
        <ul>
          <li>
            <Link to="/">Memories</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Memory} />
        <Route path="/register" component={Signup} />
        <Route path="/login" component={Signin} />
      </div>
    </Router>
  </div>;
export default App;
