const mongoose = require('mongoose');

const triviaQuestionSchema = new mongoose.Schema({
    question: String,
    number: String,
    answer: String,
    round: String
});

const Trivia_question = mongoose.model('trivia_question', triviaQuestionSchema);

module.exports = Trivia_question;
