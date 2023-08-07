const express = require("express");
const Router = require("./routes/router");
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/", Router);

app.listen(4000, () => {
  console.log(`App listening on port : http://localhost:4000`);
});
