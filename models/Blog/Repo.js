const cuid = require('cuid');
const mongoose = require('mongoose');
const BaseRepo = require('../Base/Repo');

const BlogSchema = new mongoose.Schema({
    _id: String,
    authorId: String,
    title: String,
    content: String,
    categories: [{type: String}],
    tags: [{type: String}],
}, { timestamps: true });

class BlogRepo extends BaseRepo {

    constructor(ModelName, ModelSchema) {
        super(ModelName, ModelSchema);
    }

    async create(data) {
        data._id = cuid();
        let entity = new this.Model(data);
        return entity.save();
    }

    async fetchUsersWithDecreasingNumberOfBlogs() {
        const data = await this.Model.aggregate([
            {
                $group: {
                    _id: "$authorId",
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

module.exports = new BlogRepo('Blog', BlogSchema);