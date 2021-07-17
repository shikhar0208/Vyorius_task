const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // age: {
    //   type: Number,
    //   default: 0,
    // },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;

  return userObject;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next(); //we simply call next when we are done with this function
});

const User = mongoose.model('User', userSchema);

module.exports = User;
