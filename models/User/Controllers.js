const AppError = require('../../utils/AppError');
const UserService = require('./Service')

class UserControllers {
    
    async findById(req) {

        const { id } = req.params;
        return UserService.findById(id);
    }

    async getLoggedInUser(req) {

        if (req.user) {
            return UserService.findById(req.user._id);
        } else {
            throw new AppError('Login first.', 400)
        }
    }

    async registerUser(req) {

        let { name, email, password } = req.body;
        return UserService.registerUser({name, email, password});
    }

    async updateProfile(req) {
        
        const { name } = req.body;
        const { id } = req.params;
        return UserService.updateProfile({ id, name });
    }


    async login(req) {

        const { email, password } = req.body;
        return UserService.login({email, password});
    }

    async findByName(req) {
        
        const { name } = req.params;
        return UserService.findByName(name);
    }
}

module.exports = new UserControllers();