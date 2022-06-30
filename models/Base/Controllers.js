const AppError = require('../../utils/AppError');

class BaseController {
    
    constructor(service) {
        this.service = service;
    }

    authenticate(req) {

        const { user } = req;

        if (!user) {
            throw new AppError('You are not logged in. Please login first to create a blog post.', 401);
        }
    }

    async get(req, res) {
        const { id } = req.params;
        return this.service.findOne({
            _id: id
        });
    }

    async getAll(req, res) {
        return this.service.findMany();
    }

    async post(req, res) {
        return this.service.createUnique(req.body);
    }

    async put(req, res) {
        const { id } = req.params;
        return this.service.updateById(id, req.body);
    }

    async delete(req, res) {
        const { id } = req.params;
        return this.service.deleteById(id);
    }
}

module.exports = BaseController;