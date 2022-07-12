const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date('07/12/2022 05:15:00 PM');
    let endtime = new Date('07/12/2022 06:55:00 PM');
    if (current > toStartTime && current < endtime) {
        console.log("yes");
        next();
    } else {
        console.log("no");
        res.render('captureFlag/capture_index', { alert: 'Game time is 10:20 to 11:05 pm' })
    }
}

module.exports = startgame;