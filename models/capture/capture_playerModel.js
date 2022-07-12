const mongoose = require('mongoose');

const capturePlayerSchema = new mongoose.Schema({
    name: String,
    username: String,
    submit: Boolean,
    start: String,
    questions: [{
        number: String,
        answer: String,
        time: String
    }],
    lastQue: {
        number: String,
        answer: String,
        time: String
    }
});

const Capture_player = mongoose.model('capture_player', capturePlayerSchema);

module.exports = Capture_player;
