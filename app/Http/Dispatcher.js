let routes = require("./routes");

class Dispatcher {
    constructor() {
        this.controllers = [];
        if (!this.instance) {
            this.instance = this;
        }
        return this.instance;
    }

    dispatch(request, response) {
        let path, action, args = [];
        if (request.url.length > 1) {
            path = request.url.split("/");
            [action, ...args] = path;
        } else {
            action = "/";
        }
        args = [response, args];
        if (Object.keys(routes).indexOf(action) !== -1) {
            this.get(routes[action], args)
        } else {
            this.get('Controller@pageNotFound', [response]);
        }
    }

    get(action, args) {
        try {
            let splitted = action.split("@");
            if (splitted.length === 2) {
                let [controllerName, methodName] = splitted;
                if (this.controllers.indexOf(controllerName) === -1) {
                    this.controllers[controllerName] = require(`${App.APP_PATH}Http/Controllers/${controllerName}`);
                }
                let controller = this.controllers[controllerName];
                controller[methodName](...args);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

module.exports = Object.freeze(new Dispatcher());