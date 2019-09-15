import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//  Styled Components 💅
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardButton,
  CardFieldset,
  CardInput
} from "./components/Card";

import {
  Container,
  Button,
  Radios,
  Checkbox,
  TextInput,
  TextArea,
  Avatar,
  Balloon,
  List,
  Table,
  Progress,
  Icon,
  Sprite,
  ControllerIcon
} from 'nes-react'
class Signin extends Component {
  constructor(props) {
    super(props);
 }
  state = {
    username: null,
    password: null,
    token: null,
    msg: null
  };

  signIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/signin', {
    username: this.state.username,
    password: this.state.password
  })
  .then(res => {
    if (res.status === 200) {
      localStorage.setItem('access_token', res.data.token)
      this.props.history.push('/memories');
      this.props.checkUser();
    } else {
      const error = new Error(res.error);
      this.setState({ msg: error});
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    this.setState({ msg: JSON.stringify(err)});
  });

}


  render() {
    return (
      <form onSubmit={this.signIn}>
<CardWrapper>
<Container centered>
  <CardHeader>
    <CardHeading>Log In</CardHeading>
  </CardHeader>
 {this.state.msg}
  <CardHeader>
    <CardHeading>Email</CardHeading>
  </CardHeader>
  <CardFieldset>
    <TextInput
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
    <TextInput
     id="id"
     type="password"
     placeholder="enter your password"
     onChange = { (e) => this.setState({ password: e.target.value })}
     />
  </CardFieldset>

  <Button success
  type="submit"
    onClick={() =>
    this.signIn
    }
    >Login</Button>
  </Container>
</CardWrapper>
</form>
    )
    }
  }

  export default Signin