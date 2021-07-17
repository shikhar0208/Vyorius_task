const mongoose = require('mongoose');
const Task = require('../models/task');

const addTask = async (req, res) => {
  const details = req.body;
  try {
    const newTask = new Task({
      ...details,
      owner: req.user._id,
    });

    await newTask.save();
    const tasksList = await Task.find({ owner: req.user._id });
    res.status(201).json({
      result: tasksList,
      success: true,
      message: 'New task added sucessfully',
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error in adding task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).json({
      result: {
        tasks,
        user: req.user,
      },
      success: true,
      message: 'Tasks fetched sucessfully',
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: 'Error in fetching tasks' });
  }
};

const editTask = async (req, res) => {
  try {
    const { _id, changes } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id, owner: req.user._id },
      changes,
      {
        new: true,
      }
    );

    res.status(200).json({
      result: updatedTask,
      success: true,
      message: 'Task updated successfully',
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error in updating task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.query;

    const task = await Task.findOneAndRemove({ _id: id, owner: req.user._id });

    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error in deleting task' });
  }
};

module.exports = {
  addTask,
  getTasks,
  editTask,
  deleteTask,
};
