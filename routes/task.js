const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
  addTask,
  getTasks,
  editTask,
  deleteTask,
} = require('../controllers/task');

// const auth = require ('../middleware/auth')

router.get('/', auth, getTasks);
router.post('/add', auth, addTask);
router.patch('/edit', auth, editTask);
router.delete('/delete', auth, deleteTask);

module.exports = router;
