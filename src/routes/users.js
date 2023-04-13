const express = require("express");
const router = express.Router();

router.get('/users/singin', (req,res) => {
    res.send('INGRESANDO A LA APP')
});

router.get('/users/singup', (req,res) => {
    res.send('FORMULARIO DE AUTENTICACION')
});



module.exports = router;