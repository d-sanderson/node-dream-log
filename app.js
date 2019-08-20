
//  Instantiate Express
const express = require('express');
const app = express();

//  Object Modeling (Schema) for Node.js
const mongoose = require('mongoose');

//  Middleware which parses and validates JSONS before your handlers
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Allows you to use an .env file.
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;


// Imports routes for the memories
const memory = require('./routes/memory.route');
app.use('/memory', memory);


// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

app.use(function (req, res, next) {
  res.status(404).send("(Error: 404)Sorry can't find that!")
})