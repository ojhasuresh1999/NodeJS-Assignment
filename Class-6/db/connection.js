const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/BugDB")
  .then(() => {
    console.log("Connect to BugDB");
  })
  .catch((err) => console.log(err.message));
