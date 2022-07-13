var alert = '';

const Capture_question = require('../models/capture/capture_questionModel');
const Capture_player = require('../models/capture/capture_playerModel');

const no_of_ques = 12;

const index = (req, res) => {
    alert = '';
    res.render('captureFlag/capture_index', { alert: alert });
}

const start = (req, res) => {
    const username = req.body.username;
    const name = req.body.name;

    Capture_player.findOne({ username: username }, (er, found) => {
        if (!er) {
            // if no player
            if (!found) {
                const curr_date = new Date();
                const newPlayer = {
                    username: req.body.username,
                    name: req.body.name,
                    submit: false,
                    start: curr_date.toLocaleString(),
                    questions: [],
                    lastQue: {
                        number: "0",
                        time: ""
                    }
                }
                Capture_player.create(newPlayer, (errr, person) => {
                    if (!errr) {
                        res.cookie("user", newPlayer, { signed: true, maxAge: 2 * 60 * 60 * 1000 });

                        Capture_question.findOne({ number: "1" }, (error, result) => {
                            if (!error) {
                                const ques = {
                                    question: result.question,
                                    number: result.number
                                }
                                res.render('captureFlag/question', { question: ques })
                            } else {
                                console.log(errr);
                                alert = 'some error occured, try again';
                                res.render('captureFlag/capture_index', { alert: alert });
                            }
                        })

                    } else {
                        console.log(errr);
                        alert = 'some error occured, try again';
                        res.render('captureFlag/capture_index', { alert: alert });
                    }
                })

                // if player already exists
            } else {
                let que = '1';
                if (found.lastQue.number != "0") {
                    que = (parseInt(found.lastQue.number) + 1).toString();
                } else {
                    que = "1";
                }
                // check if all 15 already done
                if (found.submit == true || que >= no_of_ques) {
                    res.render('captureFlag/capture_index', { alert: 'Your response is recorded. Stay tuned to our social media for results. Thank You ❤' })
                } else {
                    res.cookie("user", found, { signed: true, maxAge: 2 * 60 * 60 * 1000 });
                    Capture_question.findOne({ number: que }, (err, found) => {
                        if (!err && found) {
                            const ques = {
                                question: found.question,
                                number: found.number
                            }

                            res.render('captureFlag/question', { question: ques })
                        } else {
                            alert = 'some error occured, login again. dont worry your ans are saved';
                            console.log(err);
                            res.render('captureFlag/capture_index', { alert: alert });
                        }
                    })
                }

            }

        } else {
            alert = 'some error occured, try again';
            console.log(er);
            res.render('captureFlag/capture_index', { alert: alert });
        }
    })


}

const nextQue = (req, res) => {
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
    Capture_player.findOne({ username: req.user.username }, (er, found) => {
        if (!er && found) {

            found.lastQue = addToQues;
            found.questions.push(addToQues);
            if (upcomingQue >= no_of_ques) {
                found.submit = true;
            }
            found.save(error => {
                if (!error) {

                    const temp = req.user;
                    temp.lastQue = addToQues;
                    res.cookie("user", temp, { signed: true, maxAge: 2 * 60 * 60 * 1000 });

                    if (upcomingQue <= no_of_ques) {
                        Capture_question.findOne({ number: upcomingQue.toString() }, (err, found) => {
                            if (!err && found) {
                                const ques = {
                                    question: found.question,
                                    number: found.number
                                }

                                res.render('captureFlag/question', { question: ques })
                            } else {
                                alert = 'some error occured, login again. dont worry your ans are saved';
                                console.log(err);
                                res.render('captureFlag/capture_index', { alert: alert });
                            }
                        })
                    } else {
                        res.render('captureFlag/capture_index', { alert: 'Congrats! You have answered all questions. Stay tuned to our social media for results. Thank You ❤' })
                    }
                } else {
                    alert = 'some error occured, login again. dont worry your ans are saved';
                    console.log(err);
                    res.render('captureFlag/capture_index', { alert: alert });
                }

            })


        } else {
            alert = 'some error occured, login again. dont worry your ans are saved';
            console.log(err);
            res.render('captureFlag/capture_index', { alert: alert });
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

    Capture_question.findOne({ number: question }, (err, found) => {
        if (!err && found) {
            let processed_original_ans = found.answer.replace(/ /g, "").trim().toLowerCase();
            if (processed_ans == processed_original_ans) {
                res.json({ cluemein: 1 });
            } else {
                res.json({ cluemein: 0 });
            }
        } else {
            res.json({ cluemein: -1 });
        }
    })
    // console.log(toReturn);
    // res.json({cluemein: toReturn});

}

const finish = (req, res) => {
    Capture_player.findOneAndUpdate({ username: req.user.username }, { submit: true }, (err, docs) => {
        if (!err) {
            res.clearCookie("user");
            res.render('captureFlag/capture_index', { alert: 'Your response is recorded! Stay tuned to our social media for results. Thank You ❤' });
        } else {
            res.redirect('/capture');
        }
    })
}

module.exports = {
    index, start, finish, nextQue, checkAnswer
}