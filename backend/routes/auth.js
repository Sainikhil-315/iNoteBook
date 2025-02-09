const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'nikhil';
const fetchUser = require('../middleware/fetchuser');

// Route1: creating user using POST "/api/auth/createuser" Doesnt require auth NO LOGIN REQUIRED
router.post('/createuser', /* expresss validation */[
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        let success = false;
        console.log(req.body);
        // if there are errors return bad requessts
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // check whether user exists with same email
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send("user with this email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.log(error);
    }
})

// Route2: Authenticating a user using POST "/api/auth/login" NO LOGIN REQUIRED
router.post('/login', /* expresss validation */[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a value').exists(),
], async (req, res) => {
    let success = false;
    // if there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email })
        console.log(user);
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: 'User doesnt exist' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: 'enter correct password' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
})

// Route 3 Get loggedin user details /api/auth/getuser. Login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error);
            res.status(500).send('server error');
    }
})

module.exports = router;