const startgame = (req, res, next) => {
    let current = Date.now();
    let toStart = new Date('05/11/2021 10:14:00 PM');
    let endtime = new Date('05/14/2021 12:43:00 PM');
    if( current > toStart && current < endtime) {
        next();
    } else {
        res.render('treasureHunt/hunt_index', {alert: 'Game time is 10:15 to 11:00 pm'})
    }
}

module.exports = startgame;