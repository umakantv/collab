const User = require("../models/User/Router");
const Category = require("../models/Category/Router");
const Tag = require("../models/Tag/Router");
const Blog = require("../models/Blog/Router");

function initiateRoutes(app) {
    app.use(User);
    app.use(Category);
    app.use(Tag);
    app.use(Blog);
}

module.exports = initiateRoutes;