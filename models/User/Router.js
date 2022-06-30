const BaseRouter = require("../Base/Router");
const Controllers = require("./Controllers");

class Router extends BaseRouter {
    constructor(Controllers) {
        super(Controllers)
    }
}

const router = new Router(Controllers);

router.registerRoute('get', '/user/search/:name', 'findByName');
router.registerRoute('get', '/user/me', 'getLoggedInUser');
router.registerRoute('get', '/user/:id', 'findById');

router.registerRoute('post', '/user/register', 'registerUser');
router.registerRoute('post', '/user/login', 'login');

router.registerRoute('patch', '/user/:id', 'updateProfile');

module.exports = router.Router;