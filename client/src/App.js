import React, { Component } from 'react';
import axios from 'axios';
import styled, { css, ThemeProvider } from 'styled-components'

//  Styled Components 💅
import Wrapper from './components/Wrapper'
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
  font: 'Monda, Arial',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    console.log(date);
  }
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
  componentDidMount() {
    this.getDataFromDB();
    let interval = setInterval(this.getDataFromDB, 5000);
    this.setState({ intIsSet: interval })
  }
  componentWillUnmount() {
    if(this.state.intIsSet) {
    clearInterval(this.state.intIsSet);
    this.setState({ intIsSet: null });
  }
}
//  CREATE
putDataToDB = (description, title, people, date) => {
  let currentIds = this.state.data.map((data) => data.id);
  let idToBeAdded = 0;
  while(currentIds.includes(idToBeAdded)) {
    idToBeAdded++;
  }
  axios.post('http://localhost:3001/api/memories/', {
    id: idToBeAdded,
    description: description,
    title: title,
    people: people,
    date: date
  });
}
//  READ
getDataFromDB = () => {
  fetch('http://localhost:3001/api/memories/')
  .then((data) => data.json())
  .then((res) => this.setState({ data: res.data }));
};
//  UPDATE
updateDB = (idToUpdate, updateToApply) => {
  let objIdToUpdate = null;
  parseInt(idToUpdate);
  this.state.data.forEach((data) => {
    if(data.id == idToUpdate) {
      objIdToUpdate = data._id
    }
  });
  axios.post('http://localhost:3001/api/memories/update', {
    id: objIdToUpdate,
    update: { description: updateToApply },
  });
};
//  DELETE
deleteFromDB = (idToDelete) => {
  parseInt(idToDelete);
  let objToDelete = null;
  this.state.data.forEach((dat) => {
    if(dat.id == idToDelete) {
      objToDelete = dat._id
    }
  });
  axios.delete('http://localhost:3001/api/memories/delete', {
    data: {
      id: objToDelete,
    },
  });
};

render() {
  const { data } = this.state;
  return (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <CardHeader>
        <CardHeading>Memory Log</CardHeading>
      </CardHeader>
        {data.length <= 0
        ?
        <CardHeader>
          <CardHeading>'No Entries in DB' </CardHeading>
        </CardHeader>
        : data.map((dat) => (
          <CardWrapper key={dat.id}>
            <CardHeader>
              <CardHeading>{dat.title}</CardHeading>
            </CardHeader>
            <CardBody>

            <h3>People Involved: {dat.people}</h3>
            <p>Log: {dat.description}</p>
            <div>Date : { dat.date != null ? Date(dat.date.toString()).toString().slice(0, 15) : 'No Date Given'}</div>

            <div>
            <code>id: {dat.id}</code>
            </div>
            </CardBody>
          </CardWrapper>
        ))}



      <CardWrapper>
        <CardHeader>
          <CardHeading>Create a Memory</CardHeading>
        </CardHeader>
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
          <CardInput
            textarea="true"
            type="textarea"
            onChange={(e)=> this.setState({ description: e.target.value})}
            placeholder="What happened?"
          />
      </CardFieldset>
      <CardButton onClick={() =>this.putDataToDB(this.state.description, this.state.title, this.state.people, this.state.date)}>
        Save Your Memory
      </CardButton>

      <CardFieldset>
        <CardInput
          id="id"
          type="text"
          onChange = { (e) => this.setState({ idToDelete: e.target.value })}
          placeholder="Enter the Memory Id to confirm deletion"
        />

      <CardHeader>
        <CardHeading>Delete a Memory: </CardHeading>
      </CardHeader>
      </CardFieldset>
        <CardButton red= "red" onClick= {() => this.deleteFromDB(this.state.idToDelete)}>
          Delete Memory
        </CardButton>
      <CardHeader>
        <CardHeading>Update a Memory: </CardHeading>
      </CardHeader>
      <CardFieldset>
        <CardInput
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
      <CardButton
        onClick={() =>
        this.updateDB(this.state.idToUpdate, this.state.updateToApply)
        }
      >
        Update Memory
      </CardButton>
    </CardWrapper>
  </Wrapper>
  </ThemeProvider>
  )
  }

};
export default App;
