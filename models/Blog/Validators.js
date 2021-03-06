const Joi = require('joi');
const BaseValidator = require('../Base/Validators');

const createPostSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(1).required(),
    tags: Joi.array().items(Joi.string()).min(2).max(4).required(),
    categories: Joi.array().items(Joi.string()).min(2).max(4).required()
});

const updatePostSchema = Joi.object({
    title: Joi.string().min(5),
    content: Joi.string().min(1),
    tags: Joi.array().items(Joi.string()).min(2).max(4),
    categories: Joi.array().items(Joi.string()).min(2).max(4)
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
    'create': createPostSchema,
    'update': updatePostSchema,
});