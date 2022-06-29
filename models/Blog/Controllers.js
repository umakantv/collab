const AppError = require('../../utils/AppError');
const BaseControllers = require('../Base/Controllers');
const Service = require('./Service')

class Controller extends BaseControllers {

    constructor(service) {
        super(service);
    }

    authenticate(req) {

        const { user } = req;

        if (!user) {
            throw new AppError('You are not logged in. Please login first to create a blog post.', 401);
        }
    }

    async findBlogByIdAndUserId(req, blogId) {

        this.authenticate(req);
        const { user } = req;
        const blog = await this.service.findByIdorFail(blogId);

        if (blog.authorId !== user.id) {
            throw new AppError('Unauthorized action.', 401);
        }

        return blog;
    }
   
    async post(req) {

        this.authenticate(req);
        
        const { user } = req;
        const blog = req.body;
        blog.authorId = user.id;

        return this.service.create(blog);
    }

    async put(req, res) {
        
        const { id: blogId } = req.params;
        await this.findBlogByIdAndUserId(req, blogId);

        const blog = req.body;
        delete blog.authorId;
        
        return this.service.updateById(blogId, req.body);
    }

    async delete(req) {

        const { id: blogId } = req.params;
        const blog = await this.findBlogByIdAndUserId(req, blogId);

        return this.service.deleteById(blog);
    }
}

module.exports = new Controller(Service)