const mongoose = require('mongoose');

const triviaResponseSchema = new mongoose.Schema({
    name: String,
    username: String,
    questions: [{
        number: String,
        answer: String
    }],
    time: String
});

const Trivia_response = mongoose.model('trivia_response', triviaResponseSchema);

module.exports = Trivia_response;
