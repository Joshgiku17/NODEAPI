const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json())
app.use(cookieParser());


const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_task', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
app.use('/add', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.use('/log', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// course routes begins here
const courseRoutes = require('./routes/course')
app.use('/course', courseRoutes)

app.use('/view', (req, res) => {
  res.sendFile(__dirname + '/views/all.html');
});


app.use('/addcourse', (req, res) => {
  res.sendFile(__dirname + '/views/course.html');
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});