
const parseAdmin = (req, res, next) => {

    if(req.signedCookies.admin != undefined) {

        req.admin = req.signedCookies.admin;
        next();

    } else {
        res.redirect('/admin');
    }
}
module.exports = parseAdmin;