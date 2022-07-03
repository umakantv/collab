const AppError = require('../../utils/AppError');
const BaseControllers = require('../Base/Controllers');
const Service = require('./Service');
const validators = require('./Validators');

class Controller extends BaseControllers {

    async findBlogByIdAndUserId(req, blogId) {

        this.authenticate(req);
        const { user } = req;
        const blog = await this.service.findByIdorFail(blogId);

        if (blog.authorId.toString() !== user._id.toString()) {
            throw new AppError('Unauthorized action.', 401);
        }

        return blog;
    }

    async get(req, res) {
        const { id } = req.params;
        return this.service.findOne({
            _id: id
        });
    }
   
    async post(req) {

        const blog = req.body;
        this.validators.validateCreate(blog);

        this.authenticate(req);

        const { user } = req;
        blog.authorId = user._id;
        return this.service.create(blog);
    }

    async put(req, res) {
        
        const blogUpdateFields = req.body;
        this.validators.validateUpdate(blogUpdateFields);

        const { id: blogId } = req.params;
        const blog = await this.findBlogByIdAndUserId(req, blogId);
        
        return this.service.updateById(blogId, blogUpdateFields, blog);
    }

    async delete(req) {

        const { id: blogId } = req.params;
        await this.findBlogByIdAndUserId(req, blogId);

        return this.service.deleteById(blogId);
    }
}

module.exports = new Controller(Service, validators)