const BaseService = require('../Base/Service');
const CommentRepo = require('./Repo')
const BlogService = require('./../Blog/Service');

class CategoryService extends BaseService {

    constructor(repo, blogService) {
        super(repo);
        this.blogService = blogService;
    }

    async create(comment, user) {

        comment.userId = user.id;
        await this.blogService.findByIdorFail(comment.blogId);

        return this.repo.create(comment);
    }

    async getUsersWithDecreasingNumberOfComments() {
        return this.repo.fetchUsersWithDecreasingNumberOfComments();
    }
}

module.exports = new CategoryService(CommentRepo, BlogService);