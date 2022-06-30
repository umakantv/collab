const BaseRouter = require("../Base/Router");
const Controllers = require("./Controllers");

class Router extends BaseRouter {
    constructor(Controllers) {
        super(Controllers)
    }
}

const router = new Router(Controllers);

router.registerRoute('post', '/comment', 'post');
router.registerRoute('put', '/comment/:id', 'put');
router.registerRoute('delete', '/comment/:id', 'delete');

module.exports = router.Router;