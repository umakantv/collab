const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepo = require('./Repo')
const Config = require('./../../config')

class UserService {
    
    static async findById(id) {
        
        const user = await UserRepo.findOne({
            _id: id
        });

        return user;
    }

    static async registerUser(user) {
        
        let { name, email, password } = user;
        password = await bcryptjs.hash(password, 10);
        return UserRepo.create({name, email, password});
    }

    static async updateProfile({id, name}) {

        return UserRepo.update({ id, name });
    }


    static async login({ email, password }) {

        const user = await UserRepo.findOne({email}, 'id email password');

        const match = await bcryptjs.compare(password, user.password);

        if (match) {
            return {
                token: jwt.sign({ id: user._id, email: user.email }, Config.JWT_SECRET),
                user
            }
        } else {
            throw new Error('Invalid Credentials.');
        }
    }

    static async findByName(name) {
        
        const users = await UserRepo.findMany({
            name: {
                $regex: name, $options: "i"
            }
        });

        return users;
    }
}

module.exports = UserService;