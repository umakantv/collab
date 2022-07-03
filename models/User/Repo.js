const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');
const BaseRepo = require('../Base/Repo');
const cuid = require('cuid');

const UserSchema = new mongoose.Schema({
    _id: String,
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

    async fetchUserProfile(id) {
        return this.Model.findById(id)
    }

    async fetchUsersWithDecreasingNumberOfComments() {
        const data = await this.Model.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "userId",
                    as: "comments"
                }
            },
            {
                $addFields: {
                    "commentsCount": { $size: "$comments"}
                }
            },
            {
                $sort: {
                    "commentsCount": -1
                }
            }
        ])

        data.forEach(item => {
            delete item.comments;
            delete item.password;
        });

        return data;
    }

    async fetchUsersWithDecreasingNumberOfBlogs() {
        const data = await this.Model.aggregate([
            {
                $lookup: {
                    from: "blogs",
                    localField: "_id",
                    foreignField: "authorId",
                    as: "blogs"
                }
            },
            {
                $addFields: {
                    "blogsCount": { $size: "$blogs"}
                }
            },
            {
                $sort: {
                    "blogsCount": -1
                }
            }
        ])

        data.forEach(item => {
            delete item.blogs;
            delete item.password;
        });

        return data;
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
                _id: cuid(),
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