const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemSchema = new Schema(
  {
    id: Number,
    title: String,
    description: String,
    people: String,
    date: Date,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Memory", MemSchema);