const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

class UserRepo {
    
    static async findOne(options, selectFields) {
        const user = await User.findOne(options).select(selectFields || '-password');

        if (!user) {
            throw new AppError('User does not exist with the given id.', 404)
        } else {
            return user;
        }
        
    }

    static async findMany(options, selectFields) {
        const users = await User.find(options).select(selectFields || '-password');

        return users;
    }


    static async find(options, selectFields) {
        const users = await User.find(options).select(selectFields || '-password');

        return users;
    }

    static async create({email, name, password}) {
        let user = await User.findOne({
            email
        }).select('-password');

        if (user) {
            throw new AppError('User already exists with given email.', 400)
        } else {
            user = new User({
                name, email, password
            });

            await user.save();

            return user;
        }   
    }

    static async update({ id, name }) {
        let user = await this.findOne({
            _id: id
        });
        
        user.name = name;
        
        await user.save();
        return user;
    }
}

module.exports = UserRepo;