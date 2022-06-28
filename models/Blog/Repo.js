const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');
// const AppError = require('../../utils/AppError');

const BlogSchema = new mongoose.Schema({
    authorId: mongoose.Types.ObjectId,
    title: String,
    content: String,
}, { timestamps: true });

class BlogRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new BlogRepo('Blog', BlogSchema);