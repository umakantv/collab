const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');
// const AppError = require('../../utils/AppError');

const CategorySchema = new mongoose.Schema({
    name: String,
}, { timestamps: true });

class CategoryRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

}

module.exports = new CategoryRepo('Category', CategorySchema);