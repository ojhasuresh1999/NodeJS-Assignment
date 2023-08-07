const express = require("express");
const {
  addBug,
  getAllBugs,
  updateOverdueBugsStatus,
} = require("../controller/bugController");

const Router = express.Router();

Router.post("/addBug", addBug).get("/", getAllBugs);

setInterval(updateOverdueBugsStatus, 86400000);

module.exports = Router;
