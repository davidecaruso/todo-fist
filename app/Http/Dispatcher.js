let routes = require("./routes");

class Dispatcher {
    constructor() {
        if (!this.instance) {
            this.instance = this;
        }
        return this.instance;
    }

    dispatch(request, response) {
        let path = request.url.split("/");
        let [action, ...args] = path;
        action = action || "/";
        args = [request, response, args];
        console.log(path);
        console.log(request.url);
        if (Object.keys(routes).indexOf(action) !== -1) {
            this.get(routes[action], args)
        }
    }

    get(action, args) {
        try {
            let splitted = action.split("@");
            if (splitted.length === 2) {
                let [controllerName, methodName] = splitted;
                let controller = new (require(`${App.APP_ROOT}Http/Controllers/${controllerName}`))();
                controller[methodName](...args);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

module.exports = Dispatcher;