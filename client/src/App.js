import React, { Component } from 'react';
import Memory from './Memory';
import Signup from './Signup';
import Signin from './Signin';
import Logout from './Logout';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const token = localStorage.getItem('access_token') || null;
class App extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this)
    this.checkUser = this.checkUser.bind(this)
}
  state = {
    isLoggedIn : true
  }

  logout = function(){
    localStorage.removeItem('access_token');
    this.setState({isLoggedIn: false})
}
  checkUser = function(){
    this.setState({isLoggedIn: true})
  }
  render() {
    return (
  <Router>
    <NavBar>
      <Link to="/memories">Memories</Link>
      <Link to="/register">Register</Link>
      <Logout logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>
      </NavBar>

    <Route
      exact path='/'
      render={(props) => <Signin {...props} checkUser={this.checkUser}/>}
    />

    <Route
      path='/memories'
      render={(props) => <Memory {...props} logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>}
    />

    <Route
      path='/register'
      render={(props) => <Signup {...props} />}
    />

    </Router>
    )
  }
}
export default App;
