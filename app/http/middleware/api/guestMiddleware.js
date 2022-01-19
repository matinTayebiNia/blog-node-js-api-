const middleware = require("app/http/middleware/middleware");
const passport = require('passport')

class GuestMiddleware extends middleware {
    handel(req, res, next) {
        passport.authenticate('jwt', {session: false}, (err, user) => {
            if (user) return res.status(200).json({
                data: user.getDataOfUser(),
                status: "success"
            })
            req.user = user;
            return next();
        })(req, res, next)
    }
}

module.exports = new GuestMiddleware();