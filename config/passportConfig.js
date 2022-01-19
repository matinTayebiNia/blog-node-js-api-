const passport = require("passport")
const gate = require('app/Helpers/gate')
module.exports = (app) => {
    //set passport strategy
    require("app/passport/passport-local");
    require("app/passport/passport-jwt");

    //use passport package in app
    app.use(passport.initialize({}));
    app.use(passport.session({}))
    app.use(gate.middleware())
}