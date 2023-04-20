const express = require("express");
const router = express.Router();

router.get('/users/signin', (req,res) => {
    res.render('./users/signup.hbs')
});

router.get('/users/signup', (req,res) => {
    res.render('./users/signin.hbs')
});



module.exports = router;