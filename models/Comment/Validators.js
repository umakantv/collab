const Joi = require('joi');
const BaseValidator = require('../Base/Validators');

const createCommentSchema = Joi.object({
    text: Joi.string().min(10).required(),
    blogId: Joi.string().min(1).required(),
    commentId: Joi.string().min(1),
});

const updateCommentSchema = Joi.object({
    text: Joi.string().min(10).required(),
});

class Validator extends BaseValidator {
    
    validateCreate(data) {
        this.validate('create', data);
    }
    
    validateUpdate(data) {
        this.validate('update', data);
    }
}

module.exports = new Validator({
    'create': createCommentSchema,
    'update': updateCommentSchema,
});