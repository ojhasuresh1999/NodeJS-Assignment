const conn = require("../db/connection");
const mongoose = require("mongoose");

const Bugs = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  assignee: { type: String },
  status: {
    type: String,
    enum: ["Resolved", "Unresolved", "Overdue"],
    default: "Unresolved",
  },
  leftoverDays: {
    type: Number,
    default: 3,
  },
});

module.exports = mongoose.model("Bugs", Bugs);
