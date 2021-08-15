
const parseCookie = (req, res, next) => {

    if(req.signedCookies.user != undefined) {

        req.user = req.signedCookies.user;
        next();

    } else {
        res.redirect('/fliq')
    }
}
module.exports = parseCookie;