const User = require("./User");
const Category = require("./Category");
const Tag = require("./Tag");
const Blog = require("./Blog");

function initiateRoutes(app) {
    app.use(User);
    app.use(Category);
    app.use(Tag);
    app.use(Blog);
}

module.exports = initiateRoutes;