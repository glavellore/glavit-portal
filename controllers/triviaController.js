var alert = '';

const Trivia_question = require('../models/trivia/trivia_questionModel');
const Trivia_response = require('../models/trivia/trivia_responseModel');
const Trivia_player = require('../models/trivia/trivia_responseModel');

const index = (req, res) => {
    alert = '';
    res.render('audioTrivia/trivia_index', {alert: alert});
}

const start = (req, res) => {

    let round1 = [];
    let round2 = [];
    let round3 = [];

    Trivia_question.find({}, (err, found) => {

        if(!err) {
            found.forEach(element => {
                switch (element.round) {
                    case "1":
                        round1.push(element);
                        break;

                    case "2":
                        round2.push(element);
                        break;
                    
                    case "3":
                        round3.push(element);
                        break;

                    default:
                        break;
                }
            });

            res.render('audioTrivia/trivia_event', {rounds: [round1, round2, round3]});

        } else {
            console.log(err);
            alert = 'Some error occured! Try again after some time.';
            res.render('audioTrivia/trivia_index', {alert: alert});
        }
    })
    
}

const submit = (req, res) => {

    const time = new Date().toLocaleString();

    const newResponse = new Trivia_response({
        name: req.body.name,
        username: req.body.username,
        questions : [
        {
            number: "1",
            answer: req.body.answer1
        },
        {
            number: "2",
            answer: req.body.answer2
        },
        {
            number: "3",
            answer: req.body.answer3
        },
        {
            number: "4",
            answer: req.body.answer4
        },
        {
            number: "5",
            answer: req.body.answer5
        },
        {
            number: "6",
            answer: req.body.answer6
        },
        {
            number: "7",
            answer: req.body.answer7
        },
        {
            number: "8",
            answer: req.body.answer8
        },
        {
            number: "9",
            answer: req.body.answer9
        },
        {
            number: "10",
            answer: req.body.answer10
        },
        {
            number: "11",
            answer: req.body.answer11
        },
        {
            number: "12",
            answer: req.body.answer12
        },
        {
            number: "13",
            answer: req.body.answer13
        },
        {
            number: "14",
            answer: req.body.answer14
        },
        {
            number: "15",
            answer: req.body.answer15
        }
        ],
        time: time
    });
    newResponse.save(function(err, data) {
        if(err) {
            console.log(err);
            alert = 'Some error occured!';
            res.render('audioTrivia/trivia_index', {alert: alert});
        }
        else {
            alert = 'Your response is recorded. Stay tuned to our social media for results. Thank You ❤';
            res.render('audioTrivia/trivia_index', {alert: alert});
        }
    });

}




module.exports = {
    index, start, submit
}