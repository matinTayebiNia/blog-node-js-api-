const controller = require("app/http/controllers/api/controller")
const passport = require("passport")

class LoginController extends controller {

    async login(req, res, next) {
        try {
            if (!await this.ValidationData(req, res)) return;
            passport.authenticate("local.login", {
                session: false,
            }, (err, user, info) => {
                if (err || !user) return this.failed(info, res, 404)

                req.login(user, {session: false}, (err) => {
                    if (err) this.failed(err.message, res, 404)
                    //create token and send token
                    this.createTokenAndSend(user, res)
                })
            })(req, res, next)
        } catch (e) {
            this.failed(e.message, res)
        }
    }


}


module.exports = new LoginController();