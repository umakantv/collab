const jwt = require("jsonwebtoken");
const config = require("../config");
const UserService = require("../models/User/Service");

async function auth(req, res, next) {
    const token = req.headers['x-auth-token']
    
    jwt.verify(token, config.JWT_SECRET)

    let user = jwt.decode(token);

    user = await UserService.findById(user.id);

    req.user = user;

    next();
}

module.exports = auth;