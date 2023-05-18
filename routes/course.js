const express = require('express');
const router = express.Router();

const { course } = require('../models/')

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

router.post('/create', authenticate, async (req, res) => {
    try {
        const { course_name, course_desc } = req.body
        const addcourse = await course.create({ course_name, course_desc })
        if (addcourse) {
            res.json({ status: 200, message: 'Added' })
        } else {
            res.json({ status: 400, message: 'Failed' })

        }
    } catch (error) {
        console.log(error)
    }
});

router.put('/update/:id', authenticate, async (req, res) => {
    try {
        const { course_name, course_desc } = req.body
        const member = await course.findByPk(req.params.id);
        if (!member) {
            return res.json({ status: 404, message: "Couldn't find course" });
        } else {
            // res.json({ course_name, course_desc })
            const updateMember = await course.update({ course_name, course_desc }, {
                where: { id: req.params.id }
            });

            if (updateMember) {
                return res.json({ status: 200, message: 'Course updated successfully' });
            }
            res.json({ status: 200, message: 'Course updated successfully' });
        }
        // res.json({ member})
        res.json({ status: 400, message: 'Course not updated' });
    }
    catch (error) {
        console.log(error);
        res.json({ status: 500, message: 'Internal Server Error' });
    }
});


router.get('/getall', authenticate, async (req, res) => {
    try {
        const allcourses = await course.findAll();
        res.json(allcourses);
    } catch (error) {
        console.error('Error retrieving users', error);
        res.status(500).send('Error retrieving users');
    }

})
// router.delete('/course/:id', authenticate, async (req, res) => {
//     const id = req.params.id;

//     try {
//         // Find the user by ID
//         const course = await course.findByPk(id);

//         if (!course) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Delete the user
//         await course.destroy();

//         return res.json({ message: 'course deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });

module.exports = router