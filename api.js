const express = require('express');
const app = express();
const userRoutes = require('./routes/node');

app.use('/node', userRoutes);
app.use(express.static('views'));
app.listen(3000, () => {
  console.log('Server started on port 3000');
});