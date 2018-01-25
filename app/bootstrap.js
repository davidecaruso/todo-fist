let Dispatcher = require('./Http/Dispatcher');
let http = require('http');

class App {
    constructor() {
        this.HOST = '127.0.0.1';
        this.PORT = '1337';

        this.ROOT = `${__dirname}/../`;
        this.APP_ROOT = `${this.ROOT}app/`;
        this.PUBLIC_ROOT = `${this.ROOT}public/`;

        this.dispatcher = new Dispatcher(this);

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

module.exports = new App();