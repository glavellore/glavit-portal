var alert = '';

const Trivia_question = require('../models/trivia/trivia_questionModel');
const Trivia_player = require('../models/trivia/trivia_responseModel');

const index = (req, res) => {
    alert = '';
    res.render('audioTrivia/trivia_index', {alert: alert});
}

const start = (req, res) => {

    

    round1 = [];
    round2 = [];
    round3 = [];

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
    // const username = req.body.username;
    // const name = req.body.name;

    // Trivia_player.findOne({username: username}, (er, found) => {
    //     if(!er) {
    //         // if no player
    //         if(!found) {
                
    //             const newPlayer = {
    //                 username: req.body.username,
    //                 name: req.body.name,
    //                 submit: false,
    //                 questions: [],
    //                 lastQue: {
    //                     number: "0",
    //                     time: ""
    //                 }
    //             }
    //             Trivia_player.create(newPlayer, (errr, person) => {
    //                 if(!errr) {
    //                     res.cookie("user", newPlayer, { signed:true, maxAge: 2*60*60*1000});

    //                     Trivia_question.findOne({number: "1"}, (error, result) => {
    //                         if(!error) {
    //                             const ques = {
    //                                 question: result.question,
    //                                 number: result.number
    //                             }
    //                             res.render('audioTrivia/question', {question: ques})
    //                         } else {
    //                             console.log(errr);
    //                             alert = 'some error occured, try again';
    //                             res.render('audioTrivia/trivia_index', {alert: alert});
    //                         }
    //                     })
                        
    //                 } else {
    //                     console.log(errr);
    //                     alert = 'some error occured, try again';
    //                     res.render('audioTrivia/trivia_index', {alert: alert});
    //                 }
    //             })

    //         // if player already exists
    //         } else {
    //             let que = '1';
    //             if(found.lastQue.number != "0") {
    //                 que = (parseInt(found.lastQue.number) + 1).toString();
    //             } else {
    //                 que = "1";
    //             }
    //             // check if all 15 already done
    //             if(found.submit == true || que >= 15) {
    //                 res.render('audioTrivia/trivia_index', {alert: 'Your response is recorded. Stay tuned to our social media for results. Thank You ❤'})
    //             } else {
    //                 res.cookie("user", found, { signed:true, maxAge: 2*60*60*1000});
    //                 Trivia_question.findOne({number: que}, (err, found) => {
    //                     if(!err && found) {
    //                         const ques = {
    //                             question: found.question,
    //                             number: found.number
    //                         }
                
    //                         res.render('audioTrivia/question', {question: ques})
    //                     } else {
    //                         alert = 'some error occured, login again. dont worry your ans are saved';
    //                         console.log(err);
    //                         res.render('audioTrivia/trivia_index', {alert: alert});
    //                     }
    //                 })
    //             }
                
    //         }

    //     } else {
    //         alert = 'some error occured, try again';
    //         console.log(er);
    //         res.render('audioTrivia/trivia_index', {alert: alert});
    //     }
    // })
    
    
}

const nextQue = (req,res) => {
    const current_que = parseInt(req.body.question);
    const ans = req.body.answer;

    const upcomingQue = current_que + 1;

    const time = new Date().toLocaleString();
    // const addToQues = {
    //     number: req.body.question,
    //     time: time
    // }
    const addToQues = {
        number: req.body.question,
        time: time,
        answer: ans
    }
    Trivia_player.findOne({username: req.user.username}, (er, found) => {
        if(!er && found) {
            
            found.lastQue = addToQues;
            found.questions.push(addToQues);
            if(upcomingQue >= 15) {
                found.submit = true;
            }
            found.save(error => {
                if(!error) {

                    const temp = req.user;
                    temp.lastQue = addToQues;
                    res.cookie("user", temp, { signed:true, maxAge: 2*60*60*1000});
                    
                    if(upcomingQue <= 15) {
                        Trivia_question.findOne({number: upcomingQue.toString()}, (err, found) => {
                            if(!err && found) {
                                const ques = {
                                    question: found.question,
                                    number: found.number
                                }
                    
                                res.render('audioTrivia/question', {question: ques})
                            } else {
                                alert = 'some error occured, login again. dont worry your ans are saved';
                                console.log(err);
                                res.render('audioTrivia/trivia_index', {alert: alert});
                            }
                        })
                    } else {
                        res.render('audioTrivia/trivia_index', {alert: 'Congrats! You have answered all questions. Stay tuned to our social media for results. Thank You ❤'})
                    }
                } else {
                    alert = 'some error occured, login again. dont worry your ans are saved';
                    console.log(err);
                    res.render('audioTrivia/trivia_index', {alert: alert});
                }
                
            })


        } else {
            alert = 'some error occured, login again. dont worry your ans are saved';
            console.log(err);
            res.render('audioTrivia/trivia_index', {alert: alert});
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

    Trivia_question.findOne({number: question}, (err, found) => {
        if(!err && found) {
            let processed_original_ans = found.answer.replace(/ /g, "").trim().toLowerCase();
            if(processed_ans == processed_original_ans) {
                res.json({trivia: 1});
            } else {
                res.json({trivia: 0});
            }
        } else {
            res.json({trivia: -1});
        }
    })
    // console.log(toReturn);
    // res.json({trivia: toReturn});

}

const finish = (req, res) => {
    Trivia_player.findOneAndUpdate({username: req.user.username}, {submit: true}, (err, docs) => {
        if(!err) {
            res.clearCookie("user");
            res.render('audioTrivia/trivia_index', {alert: 'Your response is recorded! Stay tuned to our social media for results. Thank You ❤'});
        } else {
            res.redirect('/trivia');
        }
    })
}

module.exports = {
    index, start, finish, nextQue, checkAnswer
}