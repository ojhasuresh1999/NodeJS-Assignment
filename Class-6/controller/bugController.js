const Bugs = require("../model/bugModel");

const addBug = (req, res) => {
  Bugs.create(req.body)
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllBugs = (req, res) => {
  Bugs.find()
    .then((data) => {
      res.render("index", { bugs: data });
      //   res.send(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const calculateBugStatus = (assignedDate) => {
  const assignmentDate = new Date(assignedDate);
  const threeDaysLater = new Date(assignmentDate);
  threeDaysLater.setDate(assignmentDate.getDate() + 3);

  const leftoverDays = Math.ceil(
    (threeDaysLater - currentDate) / (1000 * 60 * 60 * 24)
  );

  if (threeDaysLater < new Date()) {
    return {
      status: "Overdue",
      leftoverDays: 0,
    };
  } else {
    return {
      status: "Unresolved",
      leftoverDays,
    };
  }
};

const updateOverdueBugsStatus = async () => {
  const bugs = await Bugs.find({ status: "Unresolved" });

  bugs.forEach(async (bug) => {
    const { _id, createdAt } = bug;
    const { newStatus, leftoverDays } = calculateBugStatus(createdAt);

    if (newStatus === "Overdue") {
      await Bugs.findByIdAndUpdate(_id, { status: "Overdue", leftoverDays });
    } else {
      await Bug.findByIdAndUpdate(_id, { leftoverDays });
    }
  });
};

module.exports = {
  addBug,
  getAllBugs,
  updateOverdueBugsStatus,
};
