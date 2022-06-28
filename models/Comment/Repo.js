const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');
// const AppError = require('../../utils/AppError');

const CommentSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    blogId: mongoose.Types.ObjectId,
    commentId: mongoose.Types.ObjectId,
    text: String,
}, { timestamps: true });

class CommentRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new CommentRepo('Comment', CommentSchema);