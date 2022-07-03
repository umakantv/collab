const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repo = require('./Repo')
const blogService = require('./../Blog/Service');
const commentService = require('./../Comment/Service');
const Config = require('./../../config');
const BaseService = require('../Base/Service');

class UserService extends BaseService {

    constructor(repo, blogService, commentService) {
        super(repo);
        this.blogService = blogService;
        this.commentService = commentService;
    }
    
    async getUserProfile(id) {
        
        const user = await this.repo.getchUserProfile(id);

        return user;
    }

    async registerUser(user) {
        
        let { name, email, password } = user;

        password = await bcryptjs.hash(password, 10);

        return this.repo.create({name, email, password});
    }

    async updateProfile({id, name}) {

        return this.repo.update({ id, name });
    }


    async login({ email, password }) {

        const user = await this.repo.findOne({email}, 'id email password');

        const match = await bcryptjs.compare(password, user.password);

        if (match) {
            return {
                token: jwt.sign({ id: user._id, email: user.email }, Config.JWT_SECRET),
                user
            }
        } else {
            throw new Error('Invalid Credentials.', 400);
        }
    }

    async findByName(name) {
        
        const users = await this.repo.findMany({
            name: {
                $regex: name, $options: "i"
            }
        });

        return users;
    }

    async getUsersWithDecreasingNumberOfComments() {
        return this.commentService.getUsersWithDecreasingNumberOfComments();
    }

    async getUsersWithDecreasingNumberOfBlogs() {
        return this.blogService.getUsersWithDecreasingNumberOfBlogs();
    }
}

module.exports = new UserService(repo, blogService, commentService);