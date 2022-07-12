require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes/mainRouter');
const huntRouter = require('./routes/huntRouter');
const captureRouter = require('./routes/captureRouter');
const triviaRouter = require('./routes/triviaRouter');
const fliqRouter = require('./routes/fliqRouter');
const adminRouter = require('./routes/adminRouter');

//express app
const app = express();
const mongoose = require('mongoose');

//ejs view engines
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './views'))

//middleware and static files
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

const uri = process.env.ATLAS_URI;
// const uri = 'mongodb://localhost:27017/storeDB';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("database connected");
});

//webpage display and load
app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/hunt', express.static(__dirname + '/public'));
app.use('/hunt', express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/capture', express.static(__dirname + '/public'));
app.use('/capture', express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/trivia', express.static(__dirname + '/public'));
app.use('/trivia', express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/fliq', express.static(__dirname + '/public'));
app.use('/fliq', express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/admin', express.static(__dirname + '/public'));
app.use('/admin', express.static(__dirname + "/node_modules/@fortawesome"));
// app.use(bodyparser.urlencoded({extended:true}));

// main router
app.use('/hunt', huntRouter);
app.use('/capture', captureRouter);
app.use('/trivia', triviaRouter);
app.use('/fliq', fliqRouter);
app.use('/admin', adminRouter);
app.use('/', mainRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on PORT " + port + "...")
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.post('*', (req, res) => {
    res.status(404).render('404');
});