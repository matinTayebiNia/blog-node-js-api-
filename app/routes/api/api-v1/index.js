const {Router} = require("express")

const routes = Router();





//middleware
const Auth = require("app/http/middleware/api/AuthMiddleware")
const isAdmin = require("app/http/middleware/api/isAdminMiddleware")
const guest = require("app/http/middleware/api/guestMiddleware")

const userRoutes = require("./user")
const adminRoutes = require("./admin")
const authRoutes = require("./auth")
const publicRoutes = require("./home")


routes.use(publicRoutes);

routes.use("/auth", guest.handel, authRoutes)

routes.use("/user", Auth.handel, userRoutes)

routes.use("/admin", [Auth.handel, isAdmin.handel], adminRoutes)


module.exports = routes;