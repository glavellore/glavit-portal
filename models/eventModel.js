const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    complete: Boolean,
    path: String,
    href: String
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
