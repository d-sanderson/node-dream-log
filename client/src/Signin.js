import React, { Component } from 'react';
import axios from 'axios';
import styled, { css, ThemeProvider } from 'styled-components'

//  Styled Components 💅
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardButton,
  CardFieldset,
  CardInput
} from "./components/Card";

class Signin extends Component {
  constructor(props) {
    super(props);
 }
  state = {
    username: null,
    password: null,
    token: null
  };

  signIn = (username, password) => {
    axios.post('http://localhost:3001/auth/signin', {
    username: username,
    password: password
  })
  .then(res => localStorage.setItem('access_token', res.data.token))
  .catch((err) => {
    console.log(err)
  })
}
  render() {
    return (
<CardWrapper>
  <CardHeader>
    <CardHeading>Sign In</CardHeading>
  </CardHeader>
  <CardHeader>
    <CardHeading>Email</CardHeading>
  </CardHeader>
  <CardFieldset>
    <CardInput
     id="id"
     type="email"
     placeholder="enter your email"
     onChange = { (e) => this.setState({ username: e.target.value })}
     />

  </CardFieldset>
  <CardHeader>
    <CardHeading>Password</CardHeading>
  </CardHeader>
  <CardFieldset>
    <CardInput
     id="id"
     type="password"
     placeholder="enter your password"
     onChange = { (e) => this.setState({ password: e.target.value })}
     />
  </CardFieldset>

  <CardButton
    onClick={() =>
    this.signIn(this.state.username, this.state.password)
    }
    >Login</CardButton>
</CardWrapper>
    )
    }
  }

  export default Signin