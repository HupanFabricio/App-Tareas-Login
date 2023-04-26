const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://c0d3fabri:Fabricio123@appnotes.0k965a0.mongodb.net/test', {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connect'))
    .catch(err => console.error(err))
