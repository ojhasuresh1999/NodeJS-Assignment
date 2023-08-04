const products = require("../model/product");

const index = (req, res) => {
  res.render("index.ejs");
};

const getProducts = (req, res) => {
  products
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createProduct = (req, res) => {
  products
    .create(req.body)
    .then((data) => {
      res.redirect("/");
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  index,
  getProducts,
  createProduct,
};
