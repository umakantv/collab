const AppError = require('../../utils/AppError');
const BaseControllers = require('../Base/Controllers');
const Service = require('./Service');
const Validators = require('./Validators');

class Controller extends BaseControllers {
    
    async post(req, res) {
        this.authenticate(req);
        
        const { user } = req;
        const comment = req.body;

        this.validators.validateCreate(comment);

        return this.service.create(comment, user);
    }

    async findCommentByIdAndUserId(req, id) {

        this.authenticate(req);
        const { user } = req;
        const comment = await this.service.findByIdorFail(id);

        if (comment.userId !== user.id) {
            throw new AppError('Unauthorized action.', 401);
        }

        return comment;
    }

    async put(req) {

        const { id } = req.params;
        const comment = await this.findCommentByIdAndUserId(req, id)
        const { text } = req.body;

        this.validators.validateUpdate({ text });

        return this.service.updateById(id, { text }, comment);
    }

    async delete(req) {

        const { id } = req.params;
        await this.findCommentByIdAndUserId(req, id);

        return this.service.deleteById(id);
    }
}

module.exports = new Controller(Service, Validators)