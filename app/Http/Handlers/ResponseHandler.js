class ResponseHandler {
    serverError (response, code, content) {
        response.writeHead(code, {'Content-Type': 'text/plain'});
        response.end(content);
    }
    renderHtml (response, content) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(content, 'utf-8');
    }
}

module.exports = ResponseHandler;