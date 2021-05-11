var alert = '';

const Hunt_question = require('../models/hunt/hunt_questionModel');
const Hunt_player = require('../models/hunt/hunt_playerModel');

const index = (req, res) => {
    alert = '';
    res.render('treasureHunt/hunt_index', {alert: alert});
}

const start = (req, res) => {
    const username = req.body.username;
    const name = req.body.name;

    Hunt_player.findOne({username: username}, (er, found) => {
        if(!er) {
            // if no player
            if(!found) {
                
                const newPlayer = {
                    username: req.body.username,
                    name: req.body.name,
                    submit: false,
                    questions: [],
                    lastQue: {
                        number: "0",
                        time: ""
                    }
                }
                Hunt_player.create(newPlayer, (errr, person) => {
                    if(!errr) {
                        res.cookie("user", newPlayer, { signed:true, maxAge: 2*60*60*1000});

                        Hunt_question.findOne({number: "1"}, (error, result) => {
                            if(!error) {
                                const ques = {
                                    question: result.question,
                                    number: result.number
                                }
                                res.render('treasureHunt/question', {question: ques})
                            } else {
                                console.log(errr);
                                alert = 'some error occured, try again';
                                res.render('treasureHunt/hunt_index', {alert: alert});
                            }
                        })
                        
                    } else {
                        console.log(errr);
                        alert = 'some error occured, try again';
                        res.render('treasureHunt/hunt_index', {alert: alert});
                    }
                })

            // if player already exists
            } else {
                let que = '1';
                if(found.lastQue.number != "0") {
                    que = (parseInt(found.lastQue.number) + 1).toString();
                } else {
                    que = "1";
                }
                // check if all 15 already done
                if(found.submit == true || que >= 15) {
                    res.render('treasureHunt/hunt_index', {alert: 'Your response is recorded. Stay tuned to our social media for results. Thank You ❤'})
                } else {
                    res.cookie("user", found, { signed:true, maxAge: 2*60*60*1000});
                    Hunt_question.findOne({number: que}, (err, found) => {
                        if(!err && found) {
                            const ques = {
                                question: found.question,
                                number: found.number
                            }
                
                            res.render('treasureHunt/question', {question: ques})
                        } else {
                            alert = 'some error occured, login again. dont worry your ans are saved';
                            console.log(err);
                            res.render('treasureHunt/hunt_index', {alert: alert});
                        }
                    })
                }
                
            }

        } else {
            alert = 'some error occured, try again';
            console.log(er);
            res.render('treasureHunt/hunt_index', {alert: alert});
        }
    })
    
    
}

const nextQue = (req,res) => {
    const current_que = parseInt(req.body.question);
    const ans = req.body.answer;

    const upcomingQue = current_que + 1;

    const time = new Date().toLocaleString();
    const last = {
        number: req.body.question,
        time: time
    }
    const addToQues = {
        number: req.body.question,
        time: time,
        answer: ans
    }
    Hunt_player.findOne({username: req.user.username}, (er, found) => {
        if(!er && found) {
            
            found.lastQue = last;
            found.questions.push(addToQues);
            if(upcomingQue >= 15) {
                found.submit = true;
            }
            found.save(error => {
                if(!error) {

                    const temp = req.user;
                    temp.lastQue = last;
                    res.cookie("user", temp, { signed:true, maxAge: 2*60*60*1000});
                    
                    if(upcomingQue <= 15) {
                        Hunt_question.findOne({number: upcomingQue.toString()}, (err, found) => {
                            if(!err && found) {
                                const ques = {
                                    question: found.question,
                                    number: found.number
                                }
                    
                                res.render('treasureHunt/question', {question: ques})
                            } else {
                                alert = 'some error occured, login again. dont worry your ans are saved';
                                console.log(err);
                                res.render('treasureHunt/hunt_index', {alert: alert});
                            }
                        })
                    } else {
                        res.render('treasureHunt/hunt_index', {alert: 'Congrats! You have answered all questions. Stay tuned to our social media for results. Thank You ❤'})
                    }
                } else {
                    alert = 'some error occured, login again. dont worry your ans are saved';
                    console.log(err);
                    res.render('treasureHunt/hunt_index', {alert: alert});
                }
                
            })


        } else {
            alert = 'some error occured, login again. dont worry your ans are saved';
            console.log(err);
            res.render('treasureHunt/hunt_index', {alert: alert});
        }
    });

    
   
}

const checkAnswer = (req, res) => {
    const question = req.params.ques;
    const answer = req.params.ans;

    let processed_ans = answer.replace(/ /g, "").trim().toLowerCase();
    // console.log(question);
    // console.log(processed_ans);

    // let toReturn;

    Hunt_question.findOne({number: question}, (err, found) => {
        if(!err && found) {
            let processed_original_ans = found.answer.replace(/ /g, "").trim().toLowerCase();
            if(processed_ans == processed_original_ans) {
                res.json({cluemein: 1});
            } else {
                res.json({cluemein: 0});
            }
        } else {
            res.json({cluemein: -1});
        }
    })
    // console.log(toReturn);
    // res.json({cluemein: toReturn});

}

const finish = (req, res) => {
    res.render('treasureHunt/hunt_index', {alert: 'Time up! Stay tuned to our social media for results. Thank You ❤'})
}

module.exports = {
    index, start, finish, nextQue, checkAnswer
}