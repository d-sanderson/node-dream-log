import React, { Component } from 'react';

import {
  Button
} from 'nes-react'
class Logout extends Component {
  constructor(props) {
    super(props);
  }
  logout = function(){
    localStorage.removeItem('access_token')
}

  render() {
    return (
      <Button
        error
        value="Log out"
        onClick = {this.logout}
      >
        Logout
      </Button>
    )
  }
}

export default Logout;