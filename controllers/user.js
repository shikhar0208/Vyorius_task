const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Task = require('../models/task');

const createToken = (userData) => {
  return jwt.sign(
    { email: userData.email, _id: userData._id },
    process.env.SECRET,
    {
      expiresIn: '7d',
    }
  );
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User already exists.' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    const token = createToken(newUser);

    res
      .status(200)
      .json({ result: newUser, token, success: true, message: 'User Created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Credentials' });
    }

    const user = JSON.parse(JSON.stringify(existingUser));
    delete user.password;
    const token = createToken(user);

    const tasks = await Task.find({ owner: user._id });

    res.status(200).json({
      result: { userData: user, tasks: tasks },
      success: true,
      token,
      message: 'Signin successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
};

module.exports = { signup, signin };
