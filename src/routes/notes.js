const express = require("express");
const router = express.Router();

router.get('/notes', (req,res) => {
    res.send('NOTES FROM DATA  BASE')
});


module.exports = router;