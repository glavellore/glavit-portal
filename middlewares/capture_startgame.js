const startgame = (req, res, next) => {
    let current = Date.now();
    let toStartTime = new Date(process.env.START);
    let endtime = new Date(process.env.END);
    if (current > toStartTime && current < endtime) {
        console.log("yes");
        next();
    } else {
        console.log("no");
        res.render('captureFlag/capture_index', { alert: 'Game time is ' + process.env.START + ' to ' + process.env.END })
    }
}

module.exports = startgame;