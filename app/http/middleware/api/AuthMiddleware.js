const middleware = require('app/http/middleware/middleware')
const passport = require('passport')

class AuthMiddleware extends middleware {

    handel(req, res, next) {
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err || !user) return res.status(401).json({
                data: info.data || "احراز حویت انجام نشده!",
                status: "error"
            })
            req.user = user;
            return next()
        })(req, res, next)
    }
}

module.exports = new AuthMiddleware();