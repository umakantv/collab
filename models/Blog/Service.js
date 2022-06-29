const BaseService = require('../Base/Service');
const Repo = require('./Repo')

class Service extends BaseService {

    constructor(repo) {
        super(repo);
    }
}

module.exports = new Service(Repo)