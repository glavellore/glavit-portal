const Capture_question = require('../models/capture/capture_questionModel');

const isfinished = (req, res, next) => {
    let current = Date.now();
    let endtime = new Date(process.env.END);

    if(current < endtime) {
            
            Capture_question.findOne({number: req.body.question}, (err, found) => {
                if(!err && found) {
                    let processed_ans = req.body.answer.replace(/ /g, "").trim().toLowerCase();
                    let processed_found = found.answer.replace(/ /g, "").trim().toLowerCase();
                    if(processed_found == processed_ans) {
                        next();
                    } else {
                        const ques = {
                            question: found.question,
                            number: found.number
                        }
            
                        res.render('captureFlag/question', {question: ques})
                    }
                    
                } else {
                    alert = 'some error occured, login again. dont worry your ans are saved';
                    console.log(err);
                    res.render('captureFlag/capture_index', {alert: alert});
                }
            })

    } else {
        // res.render('captureFlag/hunt_index', {alert: 'Time up! Stay tuned to our social media for results. Thank You ❤'})
        res.redirect('/capture/finish');
    }
}

module.exports = isfinished;