let Handler = require("../Handlers/ResponseHandler");

class Controller {
    constructor() {
        if (!this.instance) {
            this.instance = this;
        }
        this.handler = new Handler();
        return this.instance;
    }
}

module.exports = Controller;