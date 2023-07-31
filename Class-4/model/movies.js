const mongoose = require("mongoose");
const connection = require("../db/connect");

const moviesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  language: { type: String, required: true },
  achievement: String,
});

// name, genre, rating (out of 10)and language
module.exports = mongoose.model("movies", moviesSchema);
