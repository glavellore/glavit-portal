const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('07/06/2021 10:20:00 PM');
    let endtime = new Date('07/07/2021 11:05:00 PM');
    if( current > toStartTime && current < endtime) {
        console.log("yes");
        next();
    } else {
        console.log("no");
        res.render('audioTrivia/trivia_index', {alert: 'Game time is 10:00 to 11:00 pm'})
    }
}

module.exports = startgame;