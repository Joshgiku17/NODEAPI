const User = require('../models/user');

// Example controller method: Get all users
exports.getAllUsers = (sequelize) => async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).send('Error retrieving users');
  }
};

// Example controller method: Create a new user
exports.createUser = (sequelize) => async (req, res) => {
  try {
    const { name, email,pwd,phone,addresss} = req.body;
    const newUser = await User.create({name, email,pwd,phone,addresss});
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).send('Error creating user');
  }
};

// Example controller method: Get user by ID
exports.getUserById = (sequelize) => async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user', error);
    res.status(500).send('Error retrieving user');
  }
};

// Example controller method: Update user by ID
exports.updateUser = (sequelize) => async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email,pwd,phone,addresss} = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Update the user's name and email
    user.name = name;
    user.email = email;
    user.pwd = pwd;
    user.phone = phone;
    user.addresss = addresss;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).send('Error updating user');
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Delete the user
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).send('Error deleting user');
  }
};


const {user} = require('../models/index')

module.export = async function userAdd (req, res) {
  try {
        const { name, email, pwd, address, phone } = req.body
        const adduser = await user.create({ name, email, pwd, address, phone })
        if (adduser) {
            res.json({ status: 200, message: 'Added' })
        } else {
            res.json({ status: 400, message: 'Failed' })

        }
    } catch (error) {
        console.log(error);
    }
}
