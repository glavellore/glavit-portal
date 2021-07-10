const startgame = (req, res, next) => {
    
    let current = Date.now();
    let toStartTime = new Date('07/09/2021 03:12:00 PM');
    let endtime = new Date('07/10/2021 05:35:00 PM');

    if( current > toStartTime && current < endtime) {
        // console.log("yes");
        next();
    } else {
        // console.log("no");
        res.render('audioTrivia/trivia_index', {alert: 'Game time is 10 July 10:05 to 11:05 pm'})
    }
}

module.exports = startgame;