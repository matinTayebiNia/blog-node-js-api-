require('app-module-path').addPath(__dirname)

require('dotenv').config();

// noinspection JSValidateTypes
global.config = require('./config');

class Application {
    constructor() {
        config.expressConfig.setupExpress();
        config.connection.setMongoConnection();
        config.expressConfig.configurationApp();
        config.expressConfig.setRoutes();
    }
}
new Application();