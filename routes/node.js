const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const {user} = require('../models/index')

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

// Get a user by ID
router.get('/:userId', userController.getUserById);

// Update a user by ID
router.put('/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

router.get('/', (req, res) => {
    res.json('Hello')
})

//     return router;
// }


// const express = require('express')
// const route = express.Router()

// route.get('/', (req, res) => {
//     res.send('hello boi')
// })

module.exports = router