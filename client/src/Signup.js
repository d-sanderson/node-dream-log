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
  constructor(props) {
    super(props);
 }
  state = {
    username: null,
    password: null
  };

  signUp = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/users', {
    username: this.state.username,
    password: this.state.password
  }).then(res => this.props.history.push('/'))
  .catch(err => {
    console.error(err);
    alert('Error registering please try again');
  });
  };
  render() {
    return (
      <form onSubmit={this.signUp}>
        <CardWrapper>
          <Container centered>
            <CardHeader>
              <CardHeading>Register</CardHeading>
            </CardHeader>
            <CardHeader>
              <CardHeading>Email</CardHeading>
            </CardHeader>
              <CardFieldset>
              <CardInput
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
              <CardInput
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