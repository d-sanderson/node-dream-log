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


class Signup extends Component {
  state = {
    username: null,
    password: null,
    msg: null
  };

  signUp = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/users', {
    username: this.state.username,
    password: this.state.password
  }).then(res => {
    if(res.status == 200) {
    localStorage.setItem('access_token', res.data.token)
    this.setState({ msg: 'Registered Successfully!'})
    setTimeout(() => {
      this.props.checkUser();
      this.props.history.push('/memories')}
      , 1000);

  }


  })
  .catch(err => {
    console.error(err);
    let msg = ''
    if(err.message.includes('400')) {
      msg = 'Enter a username or password'
    }
    if(err.message.includes('402')) {
      msg = 'That user already exists.'
    }
    this.setState({ msg: msg})
  });
  };
  render() {
    const { msg } = this.state
    return (
      <form onSubmit={this.signUp}>
        <CardWrapper>
          <Container centered>
            <CardHeader>
              <CardHeading>Register</CardHeading>
            </CardHeader>
            {msg && msg.includes('Success') ? <Button success>{msg}</Button> : msg ? <Button error>{msg}</Button> : ''}
            <CardHeader>
              <CardHeading>Email</CardHeading>
            </CardHeader>
              <CardFieldset>
              <TextInput
                id="id"
                type="email"
                placeholder="enter your email"
                onChange = { (e) => this.setState({ username:   e.target.value })}
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
            >
            Register
            </Button>
          </Container>
        </CardWrapper>
      </form>
    )
    }
  }

  export default Signup