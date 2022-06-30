
const express = require("express");

/**
 * ## BaseRouter
 * 
 */
class BaseRouter {

    constructor(Controllers) {
        this.Controllers = Controllers;
        this.Router = express.Router();
    }

    use(...handlers) {
        this.Router.use(...handlers);
    }

    registerRoute(httpMethod, path, controllerMethod, ...middlewares) {
        this.Router[httpMethod](path, ...middlewares, this.baseHandler(controllerMethod));
    }
    
    baseHandler(method) {

        return async (req, res, next) => {
            try {
    
                const response = await this.Controllers[method](req, res, next);
                return res.send({
                    result: 'SUCCESS',
                    data: response
                });
    
            } catch(err) {
    
                console.error(err);
                
                return res.status(err.code || 500).send({
                    result: 'ERROR',
                    error: err.message,
                    data: null
                })
    
            }
        }
    }
}

module.exports = BaseRouter;