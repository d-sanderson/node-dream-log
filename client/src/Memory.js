
import React, { Component } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components'

//  Styled Components 💅
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
} from "nes-react";

import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardButton,
  CardFieldset,
  CardInput
} from "./components/Card";
const theme = {
  font: 'Press Start 2P'
};
const token = localStorage.getItem('access_token') || null

class Memory extends Component {

  state = {
    data: [],
    id: 0,
    description: null,
    title: null,
    people: null,
    date: null,
    intIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objToUpdate: null,
  };

formatDate = (date) => {
  date = new Date(date)
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  return `${months[currentMonth]}-${currentDate}-${date.getFullYear()}`;
}
//  CREATE
putDataToDB = (description, title, people, date) => {
  let currentIds = this.props.data.map((data) => data.id);
  let idToBeAdded = 0;
  while(currentIds.includes(idToBeAdded)) {
    idToBeAdded++;
  }
  axios.post('http://localhost:3001/api/memories', {
    id: idToBeAdded,
    title: title,
    date: date,
    people: people,
    description: description,
    },
  {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
}
//  UPDATE
updateDB = (idToUpdate, updateToApply) => {
  let objIdToUpdate = null;
  parseInt(idToUpdate);
  this.props.data.forEach((data) => {
    if(data.id == idToUpdate) {
      objIdToUpdate = data._id
    }
  });
  axios.post('http://localhost:3001/api/memories/update', {
    id: objIdToUpdate,
    update: { description: updateToApply },
  }, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};
//  DELETE
deleteFromDB = (idToDelete) => {
  parseInt(idToDelete);
  let objToDelete = null;
  this.props.data.forEach((dat) => {
    if(dat.id == idToDelete) {
      objToDelete = dat._id
    }
  });
  axios.delete('http://localhost:3001/api/memories/delete', {
    data: {
      id: objToDelete,
    },
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};

render() {
  const {isLoggedIn, data } = this.props
  return (
  <ThemeProvider theme={theme}>

      <div>
      <CardHeader>
        <CardHeading>   <Icon icon="star" medium />  Dream Log  <Icon icon="star" medium /></CardHeading>
      </CardHeader>
        {data == null || data.length <= 0
        ?
        <CardHeader>
          <CardHeading>'No Entries in DB' </CardHeading>
        </CardHeader>

        : !isLoggedIn
        ?
        <CardWrapper>
          <Container centered>
            <Button error>'You must be logged in to <br/>view or post memories' </Button>
          </Container>
        </CardWrapper>
        :data.map((dat) => (
          <CardWrapper key={dat.id.toString()}>
            <Container
              title={this.formatDate(dat.date)}
            >
              <CardBody>
              <h1>{dat.title}</h1>
              <p>Author: {dat.owner.username}</p>
              <p>People: {dat.people}</p>
              <p>Description: {dat.description}</p>


            <div>
            <code>id: {dat.id}</code>
            </div>
            </CardBody>
            </Container>
          </CardWrapper>
        ))}


          {isLoggedIn ?
          <div>
          <CardWrapper>
          <Container centered>
          <CardHeader>
            <CardHeading>Create a Memory</CardHeading>
          </CardHeader>
          <Progress value={100} max={100} success />
          <CardFieldset>
            <CardInput
            type="text"
            onChange={(e)=> this.setState({ title: e.target.value})}
            placeholder="Enter a title for your memory."
            />
          </CardFieldset>
          <CardHeader>
            <CardHeading>Enter the year it happened:</CardHeading>
          </CardHeader>
          <CardFieldset>
            <CardInput
              id='date'
              type="date"
              date="year"
              onChange={(e)=> this.setState({ date: e.target.value})}
              placeholder="Enter the year it took place"
            />
          </CardFieldset>
          <CardHeader>
            <CardHeading>The People who were there:</CardHeading>
          </CardHeader>
          <CardFieldset>
            <CardInput
              id='people'
              type="text"
              onChange={(e)=> this.setState({ people: e.target.value})}
              placeholder="Who was there?"
            />
          </CardFieldset>
          <CardHeader>
            <CardHeading>Memory description:</CardHeading>
          </CardHeader>
          <CardFieldset>
            <TextArea
              type="textarea"
              onChange={(e)=> this.setState({ description: e.target.value})}
              placeholder="What happened?"
            />
        </CardFieldset>
        <Button
          success
          onClick={() =>
          this.putDataToDB(
            this.state.description,
            this.state.title,
            this.state.people,
            this.state.date
            )
          }>
          Save Your Memory
        </Button>
        </Container>
        </CardWrapper>

        <CardWrapper>
        <Container centered>
        <CardHeader>
          <CardHeading>Delete a Memory: </CardHeading>
        </CardHeader>
        <Progress value={100} max={100} error />
        <CardFieldset>
          <CardInput
            id="id"
            type="text"
            onChange = { (e) => this.setState({ idToDelete: e.target.value })}
            placeholder="Enter the Memory Id to confirm deletion"
          />
        </CardFieldset>
          <Button error
          onClick= {() => this.deleteFromDB(this.state.idToDelete)}
          >
            Delete Memory
          </Button>
          </Container>
          </CardWrapper>


          <CardWrapper>
        <Container centered>
        <CardHeader>
          <CardHeading>Update a Memory: </CardHeading>
        </CardHeader>
        <Progress value={100} max={100} primary />
        <CardFieldset>
          <TextInput
            type="text"
            onChange = { (e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="put id of item to update here"
          />
          </CardFieldset>
          <CardFieldset>
          <CardInput
            type="text"
            onChange = { (e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put updated memory here"
          />
          </CardFieldset>
        <Button
          primary
          onClick={() =>
          this.updateDB(
            this.state.idToUpdate,
            this.state.updateToApply
            )
        }>
          Update Memory
        </Button>
        </Container>
          </CardWrapper></div> : ''
        }




    </div>
  </ThemeProvider>
  )
  }

};
export default Memory;