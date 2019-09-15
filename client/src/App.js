import React, { Component } from 'react';
import Memory from './Memory';
import Signup from './Signup';
import Signin from './Signin';
import Logout from './Logout';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const token = localStorage.getItem('access_token') || null;
class App extends Component {
  state = {
    isLoggedIn : false
  }

  componentWillUpdate() {
    this.checkUser();
  }

  checkUser = () => {
    token == null ? this.setState({isLoggedIn: false}) :  this.setState({isLoggedIn: true})
  }
  render() {
    return (
  <Router>
    <NavBar>
      <Link to="/memories">Memories</Link>
      <Link to="/register">Register</Link>
      <Link to="/">Login</Link>
      <Logout/>
      </NavBar>
    <Route exact path="/" component={Signin} />
    <Route path="/register" component={Signup} />
    <Route
      path='/memories'
      render={(props) => <Memory {...props}/>}
    />
    </Router>
    )
  }
}
export default App;
