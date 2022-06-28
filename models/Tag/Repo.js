const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');
// const AppError = require('../../utils/AppError');

const TagSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true });

class TagRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new TagRepo('Tag', TagSchema);