const mongoose = require('mongoose');

const captureQuestionSchema = new mongoose.Schema({
    question: String,
    number: String,
    answer: String
});

const Capture_question = mongoose.model('capture_question', captureQuestionSchema);

module.exports = Capture_question;
