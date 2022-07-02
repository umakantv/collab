const BaseControllers = require('../Base/Controllers');
const Service = require('./Service')

class Controller extends BaseControllers {

    post(req, res) {

        this.authenticate(req);
        return this.service.create(req.body);
    }
    
    put(req, res) {

        this.authenticate(req);
        
        const { id } = req.params;
        return this.service.updateById(id, req.body);
    }
}

module.exports = new Controller(Service);