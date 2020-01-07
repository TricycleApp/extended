const User = require('../../models/User');

module.exports = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.status(401).json({ error : 'Invalid request'});
    }
};