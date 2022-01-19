const middleware = require("app/http/middleware/middleware")

class IsAdminMiddleware extends middleware {
    handel(req, res, next) {
        if (req.isAuthenticated() && req.user.admin) return next()
        return res.status(401).json({
            data: "شما اجازه دسترسی ندارید",
            status: "error"
        });
    }
}

module.exports = new IsAdminMiddleware();