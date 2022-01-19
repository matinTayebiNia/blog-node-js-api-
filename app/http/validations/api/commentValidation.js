const validation = require("app/http/validations/validation")
const {check} = require("express-validator")

class CommentValidation extends validation {
    handel() {
        return [
            check('comment')
                .not().isEmpty()
                .withMessage('لطفا نظر خود را وارد کنید.')
                .isLength({min: 10})
                .withMessage('متن نظر نمیتواند کمتر از 10 کارکتر باشد.')
        ];
    }
}


module.exports = new CommentValidation();