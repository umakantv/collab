const BaseService = require('../Base/Service');
const CommentRepo = require('./Repo')

class CategoryService extends BaseService {

    constructor(repo) {
        super(repo);
    }
}

module.exports = new CategoryService(CommentRepo)