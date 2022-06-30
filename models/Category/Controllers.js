const BaseControllers = require('../Base/Controllers');
const Service = require('./Service')

class Controller extends BaseControllers {}

module.exports = new Controller(Service)