const mongoose = require('mongoose');

const huntPlayerSchema = new mongoose.Schema({
    name: String,
    username: String,
    submit: Boolean,
    questions: [{
        number: String,
        answer: String,
        time: String
    }],
    lastQue: {
        number: String,
        time: String
    }
});

const Hunt_player = mongoose.model('hunt_player', huntPlayerSchema);

module.exports = Hunt_player;
