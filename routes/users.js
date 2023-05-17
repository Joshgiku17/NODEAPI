const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const {user} = require('../models/')
// const {user} = require('../models/user');
// module.exports = (pool) => {

// Create a new user
router.post('/create', async (req, res) =>{
    try {
        const { name, email, pwd, address, phone } = req.body
        const adduser = await user.create({ name, email, pwd, address, phone })
        if (adduser) {
            res.json({ status: 200, message: 'Added' })
        } else {
            res.json({ status: 400, message: 'Failed' })

        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/getall',async(req,res)=>{
    try{
    const users = await user.findAll();
    res.json(users);
    }catch(error){
    console.error('Error retrieving users', error);
    res.status(500).send('Error retrieving users');
    }

})
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Find the user by ID
      const user = await user.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete the user
      await user.destroy();
  
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router