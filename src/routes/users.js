const express = require("express");
const router = express.Router();

router.get('/users/signin', (req,res) => {
    res.render('./users/signin.hbs')
});

router.get('/users/signup', (req,res) => {
    res.render('./users/signup.hbs')
});

router.post('/users/signup', async(req,res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    const User = require('../models/User');

    if(!name.length) {
        errors.push({text: 'Add name' })
    }

    if(!email.length) {
        errors.push({text: 'Add email' })
    }

    if(!password.length) {
        errors.push({text: 'Add password' })
    } else if (password.length < 4) {
        errors.push({text: 'Password must be at least 4 caracters' });
    } else if (password  !=  confirm_password) {
        errors.push({text: 'Password do not match' })
    }
    if(errors.length) {
        res.render('./users/signup.hbs', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');  
        }
        const newUser = new User ({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});




module.exports = router;