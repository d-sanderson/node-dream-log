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

    this.state = {
      isLoggedIn : false,
      data: null,
      intIsSet: false,
    }
}


  componentDidMount() {
    this.getDataFromDB();
    let interval = setInterval(this.getDataFromDB, 2000);
    this.setState({ intIsSet: interval })
  }

  componentWillUnmount() {
    if(this.state.intIsSet) {
    clearInterval(this.state.intIsSet);
    this.setState({ intIsSet: null });
  }
}

  getDataFromDB = () => {
    fetch('http://localhost:3001/api/memories',  {headers: {
      Authorization : 'Bearer ' + token
  }
      // 'Content-Type': 'application/x-www-form-urlencoded',
  })
    .then((data) => data.json())
    .then((res) => this.setState({ data: res.data }));
  };

  logout = () => {
    localStorage.removeItem('access_token');
    this.toggleLogin()
    this.setState({data: null });
}

  toggleLogin = () => {
    if(token) {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }
  }
  clearData = () => {
    this.setState({data: null})
  }

  render() {
    return (
  <Router>
    <NavBar>
      <Link to="/memories">Memories</Link>
      <Link to="/register">Register</Link>
      <Logout logout={this.logout} clearData={this.clearData} isLoggedIn={this.state.isLoggedIn}/>
      </NavBar>

    <Route
      exact path='/'
      render={(props) => <Signin {...props} toggleLogin={this.toggleLogin}/>}
    />

    <Route
      path='/memories'
      render={(props) => <Memory {...props} logout={this.logout} isLoggedIn={this.state.isLoggedIn} data={this.state.data}/>}
    />

    <Route
      path='/register'
      render={(props) => <Signup {...props} toggleLogin={this.toggleLogin}/>}
    />

    </Router>
    )
  }
}
export default App;
