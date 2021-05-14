const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('05/14/2021 05:45:00 PM');
    let endtime = new Date('05/14/2021 06:50:00 PM');
    if( current > toStartTime && current < endtime) {
        console.log("yes");
        next();
    } else {
        console.log("no");
        res.render('treasureHunt/hunt_index', {alert: 'Game time is 10:15 to 11:00 pm'})
    }
}

module.exports = startgame;