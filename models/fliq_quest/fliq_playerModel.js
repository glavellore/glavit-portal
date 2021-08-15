const mongoose = require('mongoose');

const fliqPlayerSchema = new mongoose.Schema({
    name: String,
    username: String,
    submit: Boolean,
    questions: [{
        number: String,
        answer: String,
        time: String,
        image: String
    }],
    lastQue: {
        number: String,
        answer: String,
        time: String
    }
});

const Fliq_player = mongoose.model('fliq_player', fliqPlayerSchema);

module.exports = Fliq_player;
