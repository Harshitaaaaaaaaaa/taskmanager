const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
};

module.exports = { getTasks, createTask };
