const AppError = require('../../utils/AppError');

class BaseService {
    
    constructor(repo) {
        this.repo = repo;
    }

    async findByIdorFail(id) {
        return this.repo.findOne({
            _id: id
        })
    }

    async findOne(options) {
        return this.repo.findOne(options)
    }

    async findMany(options) {
        return this.repo.findOne(options)
    }
    
    async createUnique(options) {
        return this.repo.create(options);
    }

    async updateById(entity) {
        return this.repo.updateEntityById(entity);
    }

    async deleteById(id) {
        return this.repo.deleteById(id);
    }
}

module.exports = BaseService;