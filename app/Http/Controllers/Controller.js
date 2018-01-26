let Handler = require("../Handlers/ResponseHandler");

class Controller {
    constructor() {
        if (!this.instance) {
            this.instance = this;
        }
        this.handler = new Handler();
        return this.instance;
    }

    pageNotFound(response) {
        this.handler.render("404", response, 404);
    }
}

module.exports = Object.freeze(new Controller());