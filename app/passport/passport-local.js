const passport = require('passport');
const localPassport = require('passport-local');
const User = require('app/models/user.model');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.register', new localPassport({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {
    User.findOne({'email': email}, function (err, user) {
        if (err) return done(err);
        if (user) return done(null, false, {param: 'email', msg: 'ایمیل قبلا ثبت شده است'})
        const newUser = new User({
            name: req.body.fullName,
            email, password,
        })
        newUser.save(err => {
            if (err) return done(err, false, {
                param: 'failedRegister',
                msg: 'ثبت نام با موفقیت انجام نشد لطفا دوباره سعی کنید'
            });
            done(null, newUser)
        });
    })
}));

passport.use('local.login', new localPassport({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {

        if (err) return done(err);

        if (!user || !user.comparePassword(password)) {
            return done(null, false, {
                param: 'failedLogin',
                msg: 'ایمیل یا رمز عبور اشتباه است .'
            });
        }
        done(null, user);
    })
}))