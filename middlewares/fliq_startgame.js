const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('08/12/2021 10:15:00 PM');
    let endtime = new Date('08/14/2021 11:00:00 PM');
    if( current > toStartTime && current < endtime) {
        // console.log("yes");
        next();
    } else {
        // console.log("no");
        res.render('fliqQuest/fliq_index', {alert: 'Event time is 10:15 to 11:00 pm'})
    }
}

module.exports = startgame;