const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('08/15/2021 04:05:00 PM');
    let endtime = new Date('08/15/2021 04:10:00 PM');
    if( current > toStartTime && current < endtime) {
        // console.log("yes");
        next();
    } else {
        // console.log("no");
        res.render('fliqQuest/fliq_index', {alert: 'Event time is 10:15 to 11:00 pm'})
    }
}

module.exports = startgame;