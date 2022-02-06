const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb://localhost/todolistv2");

// create server
const app = express();
app.use(cors());
app.use(formidable());

// Task model
const Task = mongoose.model("Task", {
  taskItem: String,
});

// create new task
app.post("/task/create", async (req, res) => {
  console.log("route : /task/create");
  console.log(req.fields.name);
  const taskName = req.fields.name;
  try {
    const newTask = new Task({
      name: taskName,
    });
    await newTask.save();
    res.json({ message: "Task created", name: taskName });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// manage unknown routes
app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

//Launch server
app.listen(3000, () => {
  console.log("Server has started.");
});
