const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Task = require('../models/task');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded._id);
    // const tasks = await Task.find({ owner: user._id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User does not exist' });
    }
    req.user = user;
    // req.tasks = tasks;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Please authenticate!' });
  }
};

module.exports = auth;
