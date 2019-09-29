import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Logout extends Component {
  render() {
    return ( <div>
      {this.props.isLoggedIn ?
      <a style={{color:'blue'}}
        onClick = {this.props.logout}
      >
        Logout
      </a> :
      <Link to="/">Login</Link>
    }
    </div>
    )
  }
}
