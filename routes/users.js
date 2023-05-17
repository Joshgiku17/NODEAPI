const express = require('express');
const router = express.Router();

const { user } = require('../models/')

const jwt = require('jsonwebtoken');

const secretKey = 'gikundiro';
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

router.post('/create', async (req, res) => {
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

router.get('/getall', async (req, res) => {
    try {
        const users = await user.findAll();
        res.json(users);
    } catch (error) {
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

router.post('/login', async (req, res) => {
    try {
        const { email, pwd } = req.body
        console.log(email, pwd)
        const userlog = await user.findOne({ where: { email: email, pwd: pwd } })
        if (userlog) {
            const token = jwt.sign({ user: { email } }, secretKey, { expiresIn: '5m' });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.json({ status: 200, message: 'User Logged in', token });

        } else {
            res.status(201).json({ status: 400, message: 'Invalid email or Password' })

            //res.json({status:400, message: 'Invalid email or password'})
            //res.json({message: 'Invalid email or password'})
        }
    } catch (error) {
        console.error(error)
    }
})
module.exports = router