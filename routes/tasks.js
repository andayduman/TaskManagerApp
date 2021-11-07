// Routes for tasks components
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Task = require("../models/Task");
const User = require("../models/User");

// '/' is referring to 'api/tasks'
// Route type: GET '/'
// Route description: Get all the tasks made by a user
// Route access: Restricted access

router.get("/", auth, async (req, res) => {
  try {
    // Getting the tasks of a user (finding user based on id first) and putting them in order of oldest to newest
    const tasks = await Task.find({ user: req.user.id }).sort({
      priority: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Route type: POST '/'
// Route description: Create a new task and send it to the database
// Route access: Restricted access
router.post(
  "/",
  [auth, [check("title", "title is required for a task").not().isEmpty()]],
  async (req, res) => {
    const requestResult = validationResult(req);
    if (!requestResult.isEmpty()) {
      return res.status(400).json({ errors: requestResult.array() });
    }

    // Getting all the attributes from the json data in the request
    const { user, title, priority, description, date } = req.body;

    // Try catch for making a new Task and saving to database, if error then send 500 status
    try {
      const newTask = new Task({
        title,
        priority,
        description,
        date,
        user: req.user.id,
      });

      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// Route type: POST '/:id'
// Route description: Update info of an existing task
// Route access: Restricted access
router.put("/:id", auth, async (req, res) => {
  const { user, title, priority, description, date } = req.body;

  // Building an object that will store the attribute values of the task
  const taskFields = {};
  if (title) taskFields.title = title;
  if (priority) taskFields.priority = priority;
  if (description) taskFields.description = description;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "task not found" });

    // Make sure the user is the "owner" of the task
    if (task.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    // Updating the tasks's information
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Route type: DELETE '/:id'
// Route description: Delete an existing task
// Route access: Restricted access
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "task not found" });

    if (task.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    // Deleting the task by using findByIdAndRemove function
    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: "task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
