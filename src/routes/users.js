const express = require("express");
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req,res) => {
    res.render('./users/signin.hbs')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup', (req,res) => {
    res.render('./users/signup.hbs')
});

router.post('/users/signup', async(req,res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

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
        const newUser = new User ({name, email, password});
        if(emailUser) {
            req.flash('error_msg', 'Registered email');
            res.redirect('/users/signin');  
        } else {
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'successfully registered');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err); 
        }
        res.redirect('/');
      });
});

module.exports = router;