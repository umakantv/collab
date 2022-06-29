const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');

class BaseRepo {

    constructor(ModelName, ModelSchema) {
        this.ModelName = ModelName;
        this.Model = mongoose.model(ModelName, ModelSchema);
    }
    
    async findOne(options) {
        const entity = await this.Model.findOne(options);

        if (!entity) {
            throw new AppError(`${this.ModelName} does not exist.`, 404)
        } else {
            return entity;
        }
    }

    async findMany(options) {
        const entities = await this.Model.find(options);
        return entities;
    }

    async createUnique(data) {
        let entity = await this.Model.findOne(data);

        if (entity) {
            throw new AppError(`${this.ModelName} already exists.`, 400)
        } else {
            entity = new this.Model(data);
            await entity.save();
            return entity;
        }
    }

    async create(data) {
        let entity = new this.Model(data);
        await entity.save();
        return entity;
    }

    async updateEntityById(id, entityUpdateFields) {
        let entity = await this.Model.findById(id);

        if (!entity) {
            throw new AppError(`${this.ModelName} does not exist.`, 404)
        }
        
        for (const [key, value] of Object.entries(entityUpdateFields)) {
            entity[key] = value;
        }

        await entity.save();
        return entity;
    }

    async deleteById(id) {
        let entity = await this.Model.findByIdAndDelete(id);

        if (!entity) {
            throw new AppError(`${this.ModelName} does not exist.`, 404)
        }

        return entity;
    }
}

module.exports = BaseRepo;