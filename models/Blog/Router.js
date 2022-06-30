const BaseRouter = require("../Base/Router");
const Controllers = require("./Controllers");

class Router extends BaseRouter {
    constructor(Controllers) {
        super(Controllers)
    }
}

const router = new Router(Controllers);

router.registerRoute('get', '/blogs', 'getAll');
router.registerRoute('get', '/blogs/:id', 'get');
router.registerRoute('post', '/blog', 'post');
router.registerRoute('put', '/blog/:id', 'put');
router.registerRoute('delete', '/blog/:id', 'delete');

module.exports = router.Router;