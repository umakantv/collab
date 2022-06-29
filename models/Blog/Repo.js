const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const BlogSchema = new mongoose.Schema({
    authorId: String,
    title: String,
    content: String,
    categories: [{type: String}],
    tags: [{type: String}],
}, { timestamps: true });

class BlogRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new BlogRepo('Blog', BlogSchema);