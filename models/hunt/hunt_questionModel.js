const mongoose = require('mongoose');

const huntQuestionSchema = new mongoose.Schema({
    question: String,
    number: String,
    answer: String
});

const Hunt_question = mongoose.model('hunt_question', huntQuestionSchema);

module.exports = Hunt_question;
