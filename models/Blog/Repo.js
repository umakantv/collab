const cuid = require('cuid');
const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const BlogSchema = new mongoose.Schema({
    _id: String,
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

    async create(data) {
        data._id = cuid();
        let entity = new this.Model(data);
        return entity.save();
    }
}

module.exports = new BlogRepo('Blog', BlogSchema);