const BaseControllers = require('../Base/Controllers');
const Service = require('./Service')

class Controller extends BaseControllers {

    constructor(service) {
        super(service);
    }
}

module.exports = new Controller(Service)