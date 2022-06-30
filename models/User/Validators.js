const Joi = require('joi');
const BaseValidator = require('../Base/Validators');

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required()
});

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required()
});

class Validator extends BaseValidator {
    
    validateRegister(data) {
        this.validate('register', data);
    }
    
    validateLogin(data) {
        this.validate('login', data);
    }
}

module.exports = new Validator({
    'register': registerSchema,
    'login': loginSchema,
});