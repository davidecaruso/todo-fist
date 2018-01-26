let fs = require("fs");
class ResponseHandler {
    renderHtml(response, content, statusCode) {
        response.writeHead(statusCode, {'Content-Type': 'text/html'});
        response.end(content, 'utf-8');
    }

    render(view, response, statusCode = 200) {
        fs.readFile(`${App.VIEWS_PATH}${view}.html`, (error, content) => {
            if (error) {
                this.render("500", response, 500);
            } else {
                this.renderHtml(response, content, statusCode);
            }
        })
    }
}

module.exports = ResponseHandler;