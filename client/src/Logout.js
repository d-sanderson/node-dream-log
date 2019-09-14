import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  logout = function(){
    localStorage.removeItem('access_token')
}

  render() {
    return (
  <div>
      <input
      type="button"
      value="Log out"
      onClick = {this.logout}
      />
    </div>
    )
  }
}

export default Logout;