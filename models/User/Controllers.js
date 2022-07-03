const AppError = require('../../utils/AppError');
const BaseController = require('../Base/Controllers');
const userService = require('./Service');
const validators = require('./Validators');

class UserControllers extends BaseController {

    constructor(userService, validators) {
        super(userService, validators)
    }
    
    async getProfile(req) {

        const { id } = req.params;
        return this.service.getUserProfile(id);
    }

    async getLoggedInUser(req) {

        if (req.user) {
            return this.service.getUserProfile(req.user._id);
        } else {
            throw new AppError('Login first.', 400)
        }
    }

    async registerUser(req) {

        const payload = req.body;

        this.validators.validateRegister(payload);

        return this.service.registerUser(payload);
    }

    async updateProfile(req) {
        
        const { name } = req.body;
        const { id } = req.params;
        return this.service.updateProfile({ id, name });
    }


    async login(req) {
        
        const payload = req.body;
        
        this.validators.validateLogin(payload);

        return this.service.login(payload);
    }

    async findByName(req) {
        
        const { name } = req.params;
        return this.service.findByName(name);
    }

    async getUsersWithDecreasingNumberOfComments() {
        return this.service.getUsersWithDecreasingNumberOfComments();
    }

    async getUsersWithDecreasingNumberOfBlogs() {
        return this.service.getUsersWithDecreasingNumberOfBlogs();
    }

    async getBlogsAndUsersWithDecreasingNumberOfComments() {
        return this.service.getBlogsAndUsersWithDecreasingNumberOfComments();
    }

    async oauthRedirect(req, res) {
        
        console.log(req.body);
    }
}

module.exports = new UserControllers(userService, validators);