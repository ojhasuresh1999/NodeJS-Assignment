const mongoose = require("mongoose");
const conn = require("../db/connection");

const orders = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  items: [String], // Assuming a list of item names
  dateInserted: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Orders", orders);

module.exports = Order;
