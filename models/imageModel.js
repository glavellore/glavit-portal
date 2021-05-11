const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    visible: String
});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;