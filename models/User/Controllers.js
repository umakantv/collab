const UserService = require('./Service')

class UserControllers {
    
    static async findById(req) {

        const { id } = req.params;
        return UserService.findById(id);
    }

    static async getLoggedInUser(req) {

        if (req.user) {
            return UserService.findById(req.user._id);
        } else {
            throw new Error('Login first.')
        }
    }

    static async registerUser(req) {

        let { name, email, password } = req.body;
        return UserService.registerUser({name, email, password});
    }

    static async updateProfile(req) {
        
        const { name } = req.body;
        const { id } = req.params;
        return UserService.updateProfile({ id, name });
    }


    static async login(req) {

        const { email, password } = req.body;
        return UserService.login({email, password});
    }

    static async findByName(req) {
        
        const { name } = req.params;
        return UserService.findByName(name);
    }
}

module.exports = UserControllers;