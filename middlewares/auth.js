const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const UserService = require("../models/User/Service");

// Attach user to request after validation 
async function auth(req, res, next) {

    const token = req.headers['x-auth-token']

    if (token) {
        try {
            jwt.verify(token, config.JWT_SECRET);

            let user = jwt.decode(token);
            if (user.iat > moment().subtract(5, 'days').unix()) {
                user = await UserService.findById(user.id);
                req.user = user;
            }


        } catch(err) {
            console.error(err)
        }
    }

    next();
}

module.exports = auth;