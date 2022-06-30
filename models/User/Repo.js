const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');
const BaseRepo = require('../Base/Repo');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
});

const ModelName = 'User';

class UserRepo extends BaseRepo {
    
    async findOne(options, selectFields) {
        const user = await this.Model.findOne(options).select(selectFields || '-password');

        if (!user) {
            throw new AppError('User does not exist with the given id.', 404)
        } else {
            return user;
        }
        
    }

    async findMany(options, selectFields) {
        const users = await this.Model.find(options).select(selectFields || '-password');

        return users;
    }


    async find(options, selectFields) {
        const users = await this.Model.find(options).select(selectFields || '-password');

        return users;
    }

    async create({email, name, password}) {
        let user = await this.Model.findOne({
            email
        }).select('-password');

        if (user) {
            throw new AppError('User already exists with given email.', 400)
        } else {
            user = new this.Model({
                name, email, password
            });

            await user.save();

            return user;
        }   
    }

    async update({ id, name }) {
        let user = await this.findOne({
            _id: id
        });
        
        user.name = name;
        
        await user.save();
        return user;
    }
}

module.exports = new UserRepo(ModelName, UserSchema);