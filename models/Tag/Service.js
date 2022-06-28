const BaseService = require('../Base/Service');
const TagRepo = require('./Repo')
// const Config = require('./../../config')

class TagService extends BaseService {

    constructor(repo) {
        super(repo);
    }
}

module.exports = new TagService(TagRepo)