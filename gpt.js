const  express = require('express');
const route = express.Router()
const {task} = require('../models/index.js');



const jwt = require('jsonwebtoken');

const secretKey = 'prino';
//hidden things
function authenticate(req, res, next) {
  const token = req.cookies.token;


  if (!token) {
    // res.redirect('/')
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
        // res.redirect('/')
    }
    req.user = decoded.user;
    next();
  });
}



route.get('/', authenticate, async (req, res) => {
    const tasks = await task.findAll();
    res.json(tasks);
})
//Adding a new tasks
route.post('/add',authenticate, async (req, res)=>{
    try {
          const { title,descr, status, duedate } = req.body
        //   console.log(title,descr, status,duedate)
          const addtask = await task.create({title,descr, status, duedate})
        if (addtask) {
            res.json({status:200, message: 'Task added successfully'})
        } else {
            res.json({status:400, message: 'Failed to add a new task'})
        }
    } catch (error) {
        console.error(error)
    }
})
//update task
route.put('/update/:id', authenticate, async (req, res)=>{
   try{
    const {title,descr,status,duedate}= req.body;
    const member = await members.findByPk(req.params.id);
    if(!member){
        return res.json({status:404, message:"Couldn't find tasks"});
    }
    const updateMember = await member.update({title,descr,status,duedate});
    if(updateMember){
        return res.json({status:200, message: 'Task updated successfully'});
   }
   res.json({status:400, message: 'Task not updated'});
}
catch(error){
    console.log(error);
    res.json({status:500, message: 'Internal Server Error'});
}
});

//search users
route.get('/:id', authenticate, async (req, res)=>{
    try {
        const id = req.params.id
        const selectedtask = await task.findByPk(id)
        res.json(selectedtask)
    } catch (error) {
        console.error(error)
    }
})

module.exports = route