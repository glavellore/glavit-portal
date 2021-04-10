require('dotenv').config();
const express = require('express');

const mainRouter = require('./routes/mainRouter');

//express app
const app = express();

//ejs view engines
app.set('view engine','ejs');

//middleware and static files
app.use(express.urlencoded({extended: true}));

//webpage display and load
app.use('/',express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + "/node_modules/@fortawesome"));
// app.use(bodyparser.urlencoded({extended:true}));

// main router
app.use('/', mainRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on PORT " + port +"...")
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.post('*', (req, res) => {
    res.status(404).render('404');
});