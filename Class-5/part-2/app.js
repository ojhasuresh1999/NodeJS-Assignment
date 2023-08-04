require("dotenv").config();
const express = require("express");
const Orders = require("./model/order");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine configuration
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

// Route to handle form submission
app.post("/", (req, res) => {
  const { name, address, email, items } = req.body;

  const newOrder = new Orders({
    name,
    address,
    email,
    items: items.split(",").map((item) => item.trim()), // Convert comma-separated items to an array
  });

  newOrder
    .save()
    .then(() => {
      res.send("Order submitted successfully!");
    })
    .catch((err) => {
      console.error("Error saving order:", err);
      res.status(500).send("Error saving order");
    });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
