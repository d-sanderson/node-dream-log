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

class Signup extends Component {
  constructor(props) {
    super(props);
 }
  state = {
    username: null,
    password: null
  };

  signUp = (username, password) => {
    axios.post('http://localhost:3001/api/users', {
    username: username,
    password: password
  });
  };
  render() {
    return (
<CardWrapper>
  <CardHeader>
    <CardHeading>Signup</CardHeading>
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
    this.signUp(this.state.username, this.state.password)
    }
    >Register</CardButton>
</CardWrapper>
    )
    }
  }

  export default Signup