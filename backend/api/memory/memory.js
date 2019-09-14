const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemSchema = new Schema(
  {
    id: Number,
    title: String,
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    description: String,
    people: String,
    date: {
    type: Date
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Memory", MemSchema);