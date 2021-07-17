if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
require('./db/mongoose.js');
const cors = require('cors');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/auth', userRoutes);
app.use('/task', taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
