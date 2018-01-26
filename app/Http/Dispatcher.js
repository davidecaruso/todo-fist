let routes = require("./routes");

class Dispatcher {
    constructor() {
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
            console.log(routes[action]);
            this.get(routes[action], args)
        } else {
            this.get('Controller@pageNotFound', [response]);
        }
    }

    get(action, args) {
        try {
            let [isStatic, char] = action.indexOf("::") !== -1 ? [true, "::"] : [false, "@"];
            let splitted = action.split(char);
            if (splitted.length === 2) {
                let [controllerName, methodName] = splitted;
                let controller = require(`${App.APP_PATH}Http/Controllers/${controllerName}`);
                if (isStatic) {
                    (controller.constructor)[methodName](...args);
                } else {
                    controller[methodName](...args);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

module.exports = Object.freeze(new Dispatcher());