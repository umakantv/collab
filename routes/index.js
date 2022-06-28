const User = require("./User");
const Category = require("./Category");
const Tag = require("./Tag");

function initiateRoutes(app) {
    app.use(User);
    app.use(Category);
    app.use(Tag);
}

module.exports = initiateRoutes;