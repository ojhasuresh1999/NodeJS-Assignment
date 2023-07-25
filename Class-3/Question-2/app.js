const express = require("express");
const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Question 2");
});

app.get("/employeeDetails", (req, res) => {
  fetch("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees")
    .then((response) => {
      return response.json();
    })
    .then((employee) => {
      res.json(employee);
      console.log(employee);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`);
});
