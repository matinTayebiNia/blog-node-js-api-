const validation = require("app/http/validations/validation")
const {check} = require("express-validator")

class ForgotValidation extends validation {
    handel() {
        return [
            check('email')
                .isEmail()
                .withMessage('ایمیل وارد نشده')
        ]
    }

}


module.exports = new ForgotValidation();