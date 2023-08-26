const express = require("express");
const app = express();
const port = 9700;
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoUrl = "mongodb://localhost:27017";
let db;
let col_name = "dashboard";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).send("Health Checked ");
});

app.get("/users", (req, res) => {
  let query = {};
  if (req.query.role && req.query.city) {
    query = { role: req.query.role, city: req.query.city, isActive: true };
  } else if (req.query.city) {
    query = { city: req.query.city, isActive: true };
  } else if (req.query.role) {
    query = { role: req.query.role, isActive: true };
  } else if (req.query.isActive) {
    let isActive = req.query.isActive;
    if (isActive == "false") {
      isActive = false;
    } else {
      isActive = true;
    }
    query = { isActive: isActive };
  } else {
    query = { isActive: true };
  }
  db.collection(col_name)
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
});

// add user
app.post("/addUser", (req, res) => {
  db.collection(col_name).insert(req.body, (err, result) => {
    if (err) throw err;
    res.status(200).send("Data Added");
  });
});

// Find Particular User
app.get("/user/:id", (req, res) => {
  let id = mongo.ObjectId(req.params.id);
  db.collection(col_name)
    .find({ _id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
});

//update User
app.put("/updateUser", (req, res) => {
  db.collection(col_name).updateOne(
    { _id: mongo.ObjectId(req.body._id) },
    {
      $set: {
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role,
        date: new Date(),
        isActive: true,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("User Updated");
    }
  );
});

// Hard Delete
app.delete("/deleteUser", (req, res) => {
  db.collection(col_name).remove(
    { _id: mongo.ObjectId(req.body._id) },
    (err, result) => {
      if (err) throw err;
      res.send("User Deleted");
    }
  );
});

// Soft Delete Deactivate User
app.put("/deactivateUser", (req, res) => {
  db.collection(col_name).updateOne(
    { _id: mongo.ObjectId(req.body._id) },
    {
      $set: {
        isActive: false,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("User Deactivated");
    }
  );
});

// Activate User
app.put("/activateUser", (req, res) => {
  db.collection(col_name).updateOne(
    { _id: mongo.ObjectId(req.body._id) },
    {
      $set: {
        isActive: true,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("User Activated");
    }
  );
});

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log(`Error While Connecting`);
  db = client.db("edumay");
  app.listen(port, (err) => {
    console.log(`Server is running on Port ${port}`);
  });
});
