const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find()
        
        const filteredUsers = allUsers.filter((user) =>
            user._id.toString() !== req.session.user._id
        )

        res.render('users/index.ejs',{ users: filteredUsers})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:userId', async (req,res) => {
    try {
        const userToShow = await User.findById(req.params.userId).populate('pantry')

        res.render('users/show.ejs', { user : userToShow})

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router