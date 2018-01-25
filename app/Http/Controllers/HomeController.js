let fs = require("fs");

class HomeController extends require("./Controller") {
    index(request, response, args) {
        fs.readFile(`${App.PUBLIC_ROOT}index.html`, (error, content) => {
            if (error) {
                this.handler.serverError(response, 500);
            } else {
                this.handler.renderHtml(response, content);
            }
        })
    }
}

module.exports = HomeController;