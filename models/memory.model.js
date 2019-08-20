
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MemorySchema = new Schema({
    name: {type: String, required: true, max: 100},
    date: {type: Date, required: false},
    description: {type: String, required: true},
    whowasthere: {type: String, required: true},
    importance: {type: String, required: false}

});


// Export the model
module.exports = mongoose.model('Memory', MemorySchema);