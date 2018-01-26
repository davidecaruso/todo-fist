let Controller = require("./Controller");

class HomeController extends Controller.constructor {
    constructor() {
        super();
    }

    index(response, args) {
        this.handler.render('Home', response);
    }
}

module.exports = Object.freeze(new HomeController());