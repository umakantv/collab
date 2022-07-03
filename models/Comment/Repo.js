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

}

module.exports = new CommentRepo('Comment', CommentSchema);