import React, { Component } from 'react';
import axios from 'axios';

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
    token: null
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
    } else {
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error logging in please try again');
  });
}


  render() {
    return (
      <form onSubmit={this.signIn}>
<CardWrapper>
<Container centered>
  <CardHeader>
    <CardHeading>Sign In</CardHeading>
  </CardHeader>

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