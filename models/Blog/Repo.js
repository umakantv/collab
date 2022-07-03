const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const BlogSchema = new mongoose.Schema({
    authorId: mongoose.Types.ObjectId,
    title: String,
    content: String,
    categories: [{type: String}],
    tags: [{type: String}],
}, { timestamps: true });

class BlogRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

    async findOne(options) {
        const entity = await this.Model.findOne(options);

        if (!entity) {
            throw new AppError(`${this.ModelName} does not exist.`, 404)
        } else {
            return entity;
        }
    }

    async findMany(options) {
        const entities = await this.Model.find(options);
        return entities;
    }

}

module.exports = new BlogRepo('Blog', BlogSchema);