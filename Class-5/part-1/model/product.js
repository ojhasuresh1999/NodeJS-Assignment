const mongoose = require("mongoose");
const conn = require("../db/conn");

const products = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String },
  item1: { type: String },
  item2: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", products);
