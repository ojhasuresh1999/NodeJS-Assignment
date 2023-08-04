const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((data) => {
    console.log("DATABASE CONNECTED SUCCESSFULLLY");
  })
  .catch((err) => {
    console.log(err.message);
  });
