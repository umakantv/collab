
class BaseRepo {
    constructor() {}

    saveMessage(message) {
        console.log(message)
    }
}

class Repo extends BaseRepo{}

class BaseService {
    constructor(repo) {
        this.repo = repo;
    }

    sendMessage(message) {
        this.repo.saveMessage(message)
    }
}

class Service extends BaseService {}

class BaseController {
    constructor(service) {
        this.service = service;
    }

    sendMessage(message) {
        this.service.sendMessage(message)
    }
}

class Controller extends BaseController{}

const repo = new Repo();
const service = new Service(repo);
const ctrl = new Controller(service)

const fn = ctrl.sendMessage

fn("Hello")