const controller = require("app/http/controllers/api/controller")
const passport = require("passport")

class RegisterController extends controller {
    async register(req, res, next) {
        try {
            if (!await this.ValidationData(req, res)) return;
            passport.authenticate("local.register", {session: false}, (err, user,info) => {
               if (err || !user) this.failed(info, res, 404)
                if (user) {
                    req.logIn(user, err => {
                        if (err) return this.failed(err.message, res, 500)
                        //create token and send token
                        return this.createTokenAndSend(user, res);
                    })
                }
            })(req, res, next)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new RegisterController();