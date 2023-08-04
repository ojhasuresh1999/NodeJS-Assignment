require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/router");

const app = express();

// Add morgan middleware
app.use(morgan("default"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
