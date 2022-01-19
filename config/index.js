const expressConfig = require("./ExpressConfig")
const database = require("./database");
const connection = require("./connection")
const session = require("./session")
const passportConfig = require("./passportConfig")
const apiLimiter = require("./apilimiter")
const cors = require("./cors")
const mailer = require("./mailer")
const queueConfig = require("./queueConfig")
const Helmet = require("./Helmet")
module.exports = {
    expressConfig,
    port: process.env.PORT,
    database,
    connection,
    Helmet,
    session,
    appName: process.env.APP_NAME,
    cookie_key: process.env.COOKIE_SECRET_KEY,
    passportConfig,
    secretKayJwt: process.env.PRIVATE_KEY_JWT,
    publicKeyJwt: process.env.PUBLIC_KEY_JWT,
    apiLimiter,
    cors,
    mailer,
    queueConfig,
    AppUrl: process.env.APP_URL,
}