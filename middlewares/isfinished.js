const Hunt_question = require('../models/hunt/hunt_questionModel');

const isfinished = (req, res, next) => {
    let current = Date.now();
    let endtime = new Date('05/12/2021 05:06:00 PM');

    if(current < endtime) {
        // if(req.signedCookies.user != undefined) {
        //     req.user = req.signedCookies.user;
            
            Hunt_question.findOne({number: req.body.question}, (err, found) => {
                if(!err && found) {

                    if(found.answer == req.body.answer) {
                        next();
                    } else {
                        const ques = {
                            question: found.question,
                            number: found.number
                        }
            
                        res.render('treasureHunt/question', {question: ques})
                    }
                    
                } else {
                    alert = 'some error occured, login again. dont worry your ans are saved';
                    console.log(err);
                    res.render('treasureHunt/hunt_index', {alert: alert});
                }
            })
        // } else {
        //     res.redirect('/hunt')
        // }
    } else {
        // res.render('treasureHunt/hunt_index', {alert: 'Time up! Stay tuned to our social media for results. Thank You ❤'})
        res.redirect('/hunt/finish');
    }
}

module.exports = isfinished;