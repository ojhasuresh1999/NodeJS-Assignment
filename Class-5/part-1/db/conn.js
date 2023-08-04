const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err.message);
  });
