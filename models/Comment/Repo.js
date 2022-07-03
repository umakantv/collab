const cuid = require('cuid');
const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const CommentSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    blogId: String,
    commentId: String,
    text: String,
}, { timestamps: true });

class CommentRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }
    
    async create(data) {
        data._id = cuid();
        let entity = new this.Model(data);
        return entity.save();
    }

    async fetchUsersWithDecreasingNumberOfComments() {
        const data = await this.Model.aggregate([
            {
                $group: {
                    _id: "$userId",
                    count: { $count: { } }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $sort: {
                    "count": -1
                }
            }
        ])

        data.forEach(item => {
            delete item.user.password;
        });

        return data;
    }

    async fetchBlogsAndUsersWithDecreasingNumberOfComments() {
        const data = await this.Model.aggregate([
            {
                $group: {
                    _id: "$blogId",
                    comments: { $count: { } }
                }
            },
            {
                $lookup: {
                    from: "blogs",
                    localField: "_id",
                    foreignField: "_id",
                    as: "blog"
                }
            },
            {
                $unwind: {
                    path: "$blog",
                    preserveNullAndEmptyArrays: false
                  }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "blog.authorId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $sort: {
                    comments: -1
                }
            },
            {
                $group: {
                    _id: "$user._id",
                    user: {
                        $push: "$user"
                    },
                    blogs: {
                        $addToSet: {
                            blog: "$blog",
                            comments: "$comments"
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            }
        ])

        data.forEach(item => {
            delete item.user.password;
        });

        return data;
    }

}

module.exports = new CommentRepo('Comment', CommentSchema);