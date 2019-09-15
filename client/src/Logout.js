import React, { Component } from 'react';

import {
  Button
} from 'nes-react'
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout = function(){
    localStorage.removeItem('access_token');

}

  render() {
    return (
      <button
        value="Log out"
        onClick = {this.logout}
      >
        Logout
      </button>
    )
  }
}

export default Logout;