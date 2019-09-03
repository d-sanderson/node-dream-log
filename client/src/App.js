import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  state = {
    data: [],
    id: 0,
    description: null,
    intIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objToUpdate: null,
  };
  componentDidMount() {
    this.getDataFromDB();
    let interval = setInterval(this.getDataFromDB, 1000);
    this.setState({ intIsSet: interval })
  }
  componentWillUnmount() {
    if(this.state.intIsSet) {
    clearInterval(this.state.intIsSet);
    this.setState({ intIsSet: null });
  }
}
//  CREATE
putDataToDB = (description) => {
  let currentIds = this.state.data.map((data) => data.id);
  let idToBeAdded = 0;
  while(currentIds.includes(idToBeAdded)) {
    idToBeAdded++;
  }
  axios.post('http://localhost:3001/api/create', {
    id: idToBeAdded,
    description: description,
  });
}
//  READ
getDataFromDB = () => {
  fetch('http://localhost:3001/api/memories')
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
  axios.post('http://localhost:3001/api/update', {
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
  axios.delete('http://localhost:3001/api/delete', {
    data: {
      id: objToDelete,
    },
  });
};

render() {
  const { data } = this.state;
  return (
    <div style={{ color: 'green', backgroundColor: 'black', height: '100vh', margin: '0 33%', textAlign: 'center'}}>
      <h1> Memory Log </h1>
      <ul>
        {data.length <= 0
        ? 'No Entries in DB'
        : data.map((dat) => (
          <li style={{ padding: '10px' }} key={dat.description}>
            <span style={{ color: 'lime'}}> Memory: {dat.id}

            </span>
            <span style={{ color: 'lime'}}> Title: </span>
            {dat.description}
          </li>
        ))}
      </ul>

      <div style= {{ padding: '10px' }}>
      <input
        type="text"
        onChange={(e)=> this.setState({ description: e.target.value})}
        placeholder="add a memory"
        style={{ width: '200px' }}
      />
      <button onClick={() =>this.putDataToDB(this.state.description)}>
        ADD
      </button>
      </div>
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          style={{ width: '200px' }}
          onChange = { (e) => this.setState({ idToDelete: e.target.value })}
          placeholder="put id of item to delete here"
        />
        <button onClick= {() => this.deleteFromDB(this.state.idToDelete)}>
          Delete
        </button>
      </div>
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          style={{ width: '200px' }}
          onChange = { (e) => this.setState({ idToUpdate: e.target.value })}
          placeholder="put id of item to update here"
        />
        <input
          type="text"
          style={{ width: '200px' }}
          onChange = { (e) => this.setState({ updateToApply: e.target.value })}
          placeholder="put updated memory here"
        />
      <button
        onClick={() =>
        this.updateDB(this.state.idToUpdate, this.state.updateToApply)
        }
      >
        Update
      </button>
    </div>
  </div>
  )
  }

};
export default App;
