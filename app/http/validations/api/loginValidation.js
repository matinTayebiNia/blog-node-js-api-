const validation = require("app/http/validations/validation")
const {check} = require("express-validator")

class loginValidation extends validation {

    handel() {
        return [
            check('email')
                .not().isEmpty()
                .withMessage('ایمیل وارد نشده')
                .isEmail()
                .withMessage('ایمیل معتبر نیست'),
            check('password')
                .not().isEmpty()
                .withMessage('رمز عبور وارد نشده')
        ]
    }

}

module.exports = new loginValidation();