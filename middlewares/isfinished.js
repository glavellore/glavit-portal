const isfinished = (req, res, next) => {
    let current = Date.now();
    let endtime = new Date('05/15/2021 11:00:00 PM');

    if(current < endtime) {
        if(req.signedCookies.user != undefined) {
            req.user = req.signedCookies.user;
            next();
        } else {
            res.redirect('/hunt')
        }
    } else {
        // res.render('treasureHunt/hunt_index', {alert: 'Time up! Stay tuned to our social media for results. Thank You ❤'})
        res.redirect('/hunt/finish');
    }
}

module.exports = isfinished;