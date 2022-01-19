const {Router} = require('express');
const routes = Router();
const cors = require("cors")
const rateLimit = require("express-rate-limit")




const apiVersion1 = require("./api-v1")

const apiLimiter = rateLimit({
    ...config.apiLimiter
})

routes.use('/api/v1', cors(config.cors.corsOption), apiLimiter, apiVersion1)
module.exports = routes;