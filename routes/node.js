const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

module.exports = (pool) =>{


// Create a new user
router.post('/create', userController.createUser);

// Get a user by ID
router.get('/:userId', userController.getUserById);

// Update a user by ID
router.put('/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

return router;
}

