const mongoose = require('mongoose');
const AppError = require('../../utils/AppError');

class BaseRepo {

    constructor(ModelName, ModelSchema) {
        this.Model = mongoose.model(ModelName, ModelSchema);
    }
    
    async findOne(options) {
        const entity = await this.Model.findOne(options);

        if (!entity) {
            throw new AppError('Entity does not exist.', 404)
        } else {
            return entity;
        }
    }

    async findMany(options) {
        const entities = await this.Model.find(options);
        return entities;
    }


    async find(options, selectFields) {
        const entities = await this.Model.find(options);

        return entities;
    }

    async create(entity) {
        let entity = await this.Model.findOne(entity);

        if (entity) {
            throw new AppError('Model already exists with given email.', 400)
        } else {
            entity = new this.Model(entity);
            await entity.save();
            return entity;
        }
    }

    async updateEntityById(entityUpdateFields) {
        let entity = await this.Model.findOne(entityUpdateField);
        
        for (const [key, value] of entityUpdateFields) {
            entity[key] = value;
        }

        await entity.save();
        return entity;
    }

    async deleteById(entity) {
        let entity = await this.Model.findOne(entity);

        if (entity) {
            throw new AppError('Model already exists with given email.', 400)
        } else {
            entity = new this.Model(entity);
            await entity.save();
            return entity;
        }
    }
}

module.exports = BaseRepo;