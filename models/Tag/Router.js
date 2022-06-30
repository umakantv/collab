const BaseRouter = require("../Base/Router");
const Controllers = require("./Controllers");

class Router extends BaseRouter {
    constructor(Controllers) {
        super(Controllers)
    }
}

const router = new Router(Controllers);

router.registerRoute('get', '/tags', 'getAll');
router.registerRoute('post', '/tag', 'post');
router.registerRoute('put', '/tag/:id', 'put');
router.registerRoute('delete', '/tag/:id', 'delete');

module.exports = router.Router;