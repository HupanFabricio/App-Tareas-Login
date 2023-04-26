const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://c0d3fabri:Zaira12342!@test.usbrsvk.mongodb.net/test', {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connect'))
    .catch(err => console.error(err))
