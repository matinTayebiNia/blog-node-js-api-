const express = require('express');
const app = express();
const session = require("express-session")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

const http = require("http")
module.exports = {
    setupExpress: () => {
        const server = http.createServer(app);
        server.listen(process.env.port || 3000, () => console.log(`Listening on port ${process.env.port}`));
    },

    configurationApp: () => {
        config.Helmet(app)
        app.use(express.static("public"))
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(session(config.session));
        app.use(cookieParser(config.cookie_key))
        app.use(methodOverride('_method'))
        config.passportConfig(app)

        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: "library api ",
                    version: "1.0.0",
                    description: "blog apis"
                },
                servers: [
                    {
                        url: "http://localhost:3000"
                    }
                ],
            },

            apis: [
                "app/routes/api/api-v1/*.js",
            ],
        }
        const specs = swaggerJsDoc(options)
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
    },

    setRoutes: () => {
        app.use(require('app/routes/api/index'))
    }
}