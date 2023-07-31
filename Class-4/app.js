require("dotenv").config();
const express = require("express");
const movies = require("./model/movies");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World...");
});

// Create movies
app.post("/createMovie", (req, res) => {
  movies
    .create(req.body)
    .then((result) => {
      res.status(200).send("Movies details added successfully");
      console.log(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// get all movies
app.get("/getMovies", (req, res) => {
  movies
    .find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

// get single movie
app.get("/getMovie/:id", (req, res) => {
  const { id: movieID } = req.params;
  movies
    .findOne({ _id: movieID })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

// three highest rated movies
app.get("/topRatedMovie", (req, res) => {
  movies
    .find()
    .sort({ rating: -1 })
    .limit(3)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//Add key achievement(using update method)
app.patch("/updateMovies/:id", (req, res) => {
  const { id: movieID } = req.params;
  movies
    .findOneAndUpdate({ _id: movieID }, req.body)
    .then((result) => {
      res.send("Movie details updated successfully...");
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//Add key achievement(using save method)
app.post("/addKey", (req, res) => {
  const movie = new movies(req.body);
  movie.save();
  res.status(201).json(req.body);
});

// Query for returns both "Super hit" and "Super Duper hit"
app.get("/superDuperHit", (req, res) => {
  movies.find({}, { achievement: 1 }).then((value) => {
    res.status(200).send(value);
    console.log(value);
  });
});

// query that returns only those movies that have achievements
app.get("/getAchievements", (req, res) => {
  movies
    .find({
      achievement: { $exists: true },
    })
    .then((achievements) => {
      res.status(200).send(achievements);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
