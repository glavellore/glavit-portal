const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('05/15/2021 10:20:00 PM');
    let endtime = new Date('05/15/2021 11:05:00 PM');
    if( current > toStartTime && current < endtime) {
        console.log("yes");
        next();
    } else {
        console.log("no");
        res.render('treasureHunt/hunt_index', {alert: 'Game time is 10:20 to 11:05 pm'})
    }
}

module.exports = startgame;