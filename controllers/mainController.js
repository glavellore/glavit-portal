const Image = require('../models/imageModel')
const Event = require('../models/eventModel')

var spotlight;
var previous;
var alert = '';

const home = async (req, res) => {

    Event.find({complete: false}, (err, found) => {
        if(!err) {
            spotlight = found;

            Event.find({complete: true}, (er, prev) => {
                if(!er) {
                    previous = prev;
                    res.render('index',{alert:alert, spotlight: spotlight, prev: previous})
                } else {
                    res.send("internal error. refresh or try after some time");
                }
            })

        } else {
            res.send("internal error. refresh or try after some time");
        }
    })
}

const index = (req, res) => {
    alert = '';
    res.redirect('/home');
}

const tippani = async (req, res) => {
    res.render('tippani')
}

const response = async (req, res) => {
    alert = 'Your response was submitted successfully!';
    res.redirect('/home');
}

const refresh = (req, res) => {
    Image.find({},(err, found) => {
        if(!err && found) {
            // console.log(found);
            res.json(found);
        } else {
            console.log(err);
        }
    })
}

module.exports = {
    index, response, tippani, refresh, home
}