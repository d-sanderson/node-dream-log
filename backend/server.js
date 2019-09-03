const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Memory = require('./memory');
const dotenv = require('dotenv');
dotenv.config();

const API_PORT = process.env.PORT || 1234;
const app = express();

app.use(cors());

//TODO modularize this
const router = express.Router();

const dbRoute = process.env.MONGODB_URI;

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database ^_^'))

db.on('error', console.error.bind(console, 'MongoDB connection error.'))

app.use(bodyParser({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/memories', (req, res) => {
  Memory.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Memory.findByIdAndUpdate(id, update, (err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Memory.findByIdAndRemove(id, (err) => {
    if(err) return res.send(err);
    return res.json({ success: true });
  })
});

router.post('/putData', (req, res) => {
  let mem = new Memory();
  const { id, description } = req.body;

  if((!id && id !== 0) || !description) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS'
    });
  }
  mem.description = description;
  mem.id = id;
  mem.save((err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))