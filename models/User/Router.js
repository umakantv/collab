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
router.registerRoute('get', '/user/:id', 'getProfile');
router.registerRoute('get', '/users/sortByCommentsCountDecreasing', 'getUsersWithDecreasingNumberOfComments');
router.registerRoute('get', '/users/sortByBlogsCountDecreasing', 'getUsersWithDecreasingNumberOfBlogs');
router.registerRoute('get', '/users/blogAndUsersByCommentCountDecreasing', 'getBlogsAndUsersWithDecreasingNumberOfComments');

router.registerRoute('post', '/user/register', 'registerUser');
router.registerRoute('post', '/user/login', 'login');

router.registerRoute('patch', '/user/:id', 'updateProfile');

module.exports = router.Router;