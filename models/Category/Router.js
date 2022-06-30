const BaseRouter = require("../Base/Router");
const Controllers = require("./Controllers");

class Router extends BaseRouter {
    constructor(Controllers) {
        super(Controllers)
    }
}

const router = new Router(Controllers);

router.registerRoute('get', '/categories', 'getAll');
router.registerRoute('post', '/category', 'post');
router.registerRoute('put', '/category/:id', 'put');
router.registerRoute('delete', '/category/:id', 'delete');

module.exports = router.Router;