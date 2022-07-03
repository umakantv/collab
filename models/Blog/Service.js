const BaseService = require('../Base/Service');
const Repo = require('./Repo')

class Service extends BaseService {

    constructor(repo) {
        super(repo);
    }

    async create(blog, user) {

        blog.authorId = user._id;
        return this.repo.create(blog);
    }

    async getUsersWithDecreasingNumberOfBlogs() {
        return this.repo.fetchUsersWithDecreasingNumberOfBlogs();
    }

}

module.exports = new Service(Repo)