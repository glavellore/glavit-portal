const mongoose = require('mongoose');

const fliqQuestionSchema = new mongoose.Schema({
    question: String,
    number: String,
    answer: String,
    image: String
});

const Fliq_question = mongoose.model('fliq_question', fliqQuestionSchema);

module.exports = Fliq_question;
