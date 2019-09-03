const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')
var cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

const API_PORT = process.env.PORT || 1234;
const dbRoute = process.env.MONGODB_URI;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database ^_^'))
db.on('error', console.error.bind(console, 'MongoDB connection error.'))
const router = require('./memory.routes')
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))