let Dispatcher = require('./Http/Dispatcher');
let http = require('http');

class App {
    constructor() {
        this.HOST = '127.0.0.1';
        this.PORT = '1337';

        this.ROOT = `${__dirname}/../`;
        this.APP_PATH = `${this.ROOT}app/`;
        this.PUBLIC_PATH = `${this.ROOT}public/`;
        this.VIEWS_PATH = `${this.APP_PATH}Views/`;

        this.dispatcher = Dispatcher;

        if (!this.instance) {
            this.instance = this;
        }
        return this.instance;
    }

    run() {
        http.createServer((request, response) => {
            try {
                this.dispatcher.dispatch(request, response);
            } catch (err) {
                response.writeHead(500);
                response.end('Internal Server Error');
            }
        }).listen(this.PORT, this.HOST, () => {
            console.log(`Server running at http://${this.HOST}:${this.PORT}`);
        });
    }
}

module.exports = Object.freeze(new App());