const Event = require("../models/eventModel");
const Hunt_player = require("../models/hunt/hunt_playerModel");
const Capture_player = require("../models/capture/capture_playerModel");
const Trivia_response = require("../models/trivia/trivia_responseModel");
const Trivia_question = require("../models/trivia/trivia_questionModel");
const Fliq_player = require("../models/fliq_quest/fliq_playerModel");

var alert = '';

const index = (req, res) => {
    if(req.signedCookies.admin != undefined) {

        res.clearCookie('admin');
    }
    res.render('admin/admin_index', {alert: alert});
}

const login = (req, res) => {
    if(req.body.password == process.env.ADMIN_PASS) {
        res.cookie("admin", "gla_vit", { signed:true, maxAge: 60*60*1000});   
        res.redirect('/admin/home'); 
    } else {
        alert = 'Incorrect password! You are not authorised to access this page';
        res.render('admin/admin_index', {alert:alert});
    }
}

const home = (req, res) => {
    Event.find({result: true}, (err, found) => {
        if(!err) {
            res.render('admin/admin_home.ejs', {results: found});
        } else {
            res.redirect('/admin');
        }
    });
}

const huntResult = (req, res) => {
    let last_que_list = [];
    let ans_list = [];
    let que_num = [];

    Hunt_player.find({}, (err, found) => {
        if(!err && found) {
            found.forEach(element => {
                const newAns = {
                    number: element.lastQue.number,
                    time: element.lastQue.time,
                    name: element.name,
                    username: element.username,
                    answer: element.lastQue.answer
                }
                last_que_list.push(newAns);
                que_num.push(newAns.number);
                
            });

            const unique_que_num = [...new Set(que_num)];
            
            unique_que_num.forEach(num => {
                
                let toAdd = {
                    number: num,
                    answers: []
                }

                last_que_list.forEach(element => {
                    if(element.number == num) {
                        toAdd.answers.push(element);
                    }
                });

                ans_list.push(toAdd);

            });
            
            
            const sortAccToNumber = ans_list.sort((a, b) => parseFloat(b.number) - parseFloat(a.number));

            sortAccToNumber.forEach(element => {
                element.answers = element.answers.sort((a, b) => (new Date(a.time)) - (new Date(b.time)));
            });
        
            res.render('admin/result/hunt_result.ejs', {results: sortAccToNumber});
        } else {
            res.redirect('admin/home');
        }
    })
    
}


const captureResult = (req, res) => {
    let last_que_list = [];
    let ans_list = [];
    let que_num = [];

    Capture_player.find({}, (err, found) => {
        if(!err && found) {
            found.forEach(element => {
                const newAns = {
                    number: element.lastQue.number,
                    time: Math.ceil((new Date(element.lastQue.time) - new Date(element.start)) / (1000 * 60)),
                    start: element.start,
                    end: element.lastQue.time,
                    name: element.name,
                    username: element.username,
                    answer: element.lastQue.answer
                }
                last_que_list.push(newAns);
                que_num.push(newAns.number);
                
            });

            const unique_que_num = [...new Set(que_num)];
            
            unique_que_num.forEach(num => {
                
                let toAdd = {
                    number: num,
                    answers: []
                }

                last_que_list.forEach(element => {
                    if(element.number == num) {
                        toAdd.answers.push(element);
                    }
                });

                ans_list.push(toAdd);

            });
            
            
            const sortAccToNumber = ans_list.sort((a, b) => parseFloat(b.number) - parseFloat(a.number));

            sortAccToNumber.forEach(element => {
                // element.answers = element.answers.sort((a, b) => (new Date(a.time)) - (new Date(b.time)));
                element.answers = element.answers.sort((a, b) => ((a.time)) - ((b.time)));
            });
        
            res.render('admin/result/capture_result.ejs', {results: sortAccToNumber});
        } else {
            res.redirect('admin/home');
        }
    })
    
}

const fliqResult = (req, res) => {
    let last_que_list = [];
    let ans_list = [];
    let que_num = [];

    Fliq_player.find({}, (err, found) => {
        if(!err && found) {
            found.forEach(element => {
                const newAns = {
                    number: element.lastQue.number,
                    time: element.lastQue.time,
                    name: element.name,
                    username: element.username,
                    answer: element.lastQue.answer
                }
                last_que_list.push(newAns);
                que_num.push(newAns.number);
                
            });

            const unique_que_num = [...new Set(que_num)];
            
            unique_que_num.forEach(num => {
                
                let toAdd = {
                    number: num,
                    answers: []
                }

                last_que_list.forEach(element => {
                    if(element.number == num) {
                        toAdd.answers.push(element);
                    }
                });

                ans_list.push(toAdd);

            });
            
            
            const sortAccToNumber = ans_list.sort((a, b) => parseFloat(b.number) - parseFloat(a.number));

            sortAccToNumber.forEach(element => {
                element.answers = element.answers.sort((a, b) => (new Date(a.time)) - (new Date(b.time)));
            });
        
            res.render('admin/result/fliq_result.ejs', {results: sortAccToNumber});
        } else {
            res.redirect('admin/home');
        }
    })
    
}

const triviaResult = (req, res) => {

    var answers;
    var sortedAnswers;
    Trivia_question.find({}, (err, found) => {
        if(!err){
            answers = found;
            sortedAnswers = answers.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));

        } else {
            console.log(err);
            res.redirect('admin/home');
        }
    })

    Trivia_response.find({}, (err, found) => {
        if(!err) {
            var result = found;
            var sortAccToTime = found.sort((a, b) => (new Date(a.time)) - (new Date(b.time)));
            // sortAccToTime.forEach(element => {
            //     console.log(element);
            // });
            res.render('admin/result/trivia_result.ejs', {results: sortAccToTime, answers: sortedAnswers});
            // res.send("hey")
        } else {
            console.log(err);
            res.redirect('admin/home');
        }
    })
    
}

module.exports = {
    index, login, home, huntResult, triviaResult, fliqResult, captureResult
}