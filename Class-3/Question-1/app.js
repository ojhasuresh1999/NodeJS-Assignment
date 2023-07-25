const express = require("express");
const PORT = 3000;
const data1 = require("./employee.json");
const data2 = require("./projects.json");
const employees = data1.employees;
const projects = data2.projects;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Question 1");
});

// get all employees data
app.get("/employees", (req, res) => {
  res.json(employees);
});

//Single Employee Data
app.get("/employee/:employeeID", (req, res) => {
  let { employeeID } = req.params;
  console.log(employeeID);
  let employee = employees.find(
    (employee) => employee.employeeID === employeeID
  );
  res.json(employee);
});

//get all projects information
app.get("/projects", (req, res) => {
  res.json(projects);
});

//ProjectInformation
app.get("/project/:projectID", (req, res) => {
  let { projectID } = req.params;
  console.log(projectID);
  let project = projects.find((project) => project.projectID === projectID);
  res.json(project);
});

// getemployeedetails
app.get("/getemployeedetails/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  fetch(`http://localhost:3000/employee/${employeeId}`)
    .then((response) => response.json())
    .then((employee) => {
      const projectId = employee.projectID;

      fetch(`http://localhost:3000/project/${projectId}`)
        .then((response) => response.json())
        .then((project) => {
          const employeeDetails = {
            employeeName: employee.employeeName,
            employeeID: employee.employeeID,
            details: employee.employeeDetails,
            projectDetails: project,
          };
          res.json(employeeDetails);
          console.log(employeeDetails);
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

// app.get("/getemployeedetails", (req, res) => {
//   fetch("http://localhost:3000/employees")
//     .then((response) => {
//       return response.json();
//     })
//     .then((employees) => {
//       fetch("http://localhost:3000/projects")
//         .then((response) => {
//           return response.json();
//         })
//         .then((projects) => {
//           const employeesDetails = {
//             employees: employees,
//             projects: projects,
//           };
//           res.json(employeesDetails);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
// });

app.listen(PORT, () => {
  console.log(`App listening on port: http://localhost:${PORT}`);
});
