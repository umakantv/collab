const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const CommentSchema = new mongoose.Schema({
    userId: String,
    blogId: String,
    commentId: String,
    text: String,
}, { timestamps: true });

class CommentRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new CommentRepo('Comment', CommentSchema);