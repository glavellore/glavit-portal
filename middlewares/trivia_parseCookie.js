
const parseCookie = (req, res, next) => {

    if(req.signedCookies.user != undefined) {

        req.user = req.signedCookies.user;
        next();

    } else {
        res.redirect('/trivia')
    }
}
module.exports = parseCookie;