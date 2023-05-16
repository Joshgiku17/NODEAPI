// const express = require('express');
// const app = express();
// const mysql = require('mysql2');
// const {Sequelize}= require('sequelize'); 

// const sequelize = new Sequelize('node_task', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });


// //I've realized we need to import/ require the routes 
// const userRoutes= require('./routes/node');

// //then we do the mounting of the routes obtained
// app.use('/users', userRoutes);

// //starting the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });