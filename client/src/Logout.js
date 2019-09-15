import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn, logout } = this.props;
    return ( <div>
      {isLoggedIn ?
      <a style={{color:'blue'}}
        onClick = {logout}
      >
        Logout
      </a> :
      <Link to="/">Login</Link>
    }
    </div>
    )
  }
}
