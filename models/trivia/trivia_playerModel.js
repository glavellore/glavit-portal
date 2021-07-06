const mongoose = require('mongoose');

const triviaPlayerSchema = new mongoose.Schema({
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
        answer: String,
        time: String
    }
});

const Trivia_player = mongoose.model('trivia_player', triviaPlayerSchema);

module.exports = Trivia_player;
