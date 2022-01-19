const validation = require('app/http/validations/validation')
const {check} = require('express-validator')
const Role = require('app/models/role.model')

class RoleValidation extends validation {
    handel() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('نام دسترسی وارد نشده')
                .isLength({min: 3})
                .withMessage('عنوان کمتر از 3 کاراکتر میباشد')
                .custom(async (value, {req}) => {
                    if (req.query._method === 'put') {
                        let permission = await Role.findById(req.params.id);
                        if (permission.name === value) return;
                    }
                    let find = await Role.findOne({name: value})
                    if (find) {
                        throw new Error('دسترسی وارد شده تکراری میباشد.')
                    }
                })
            ,
            check('label')
                .not().isEmpty()
                .withMessage('توضیحات مربوط به دسترسی خالی می باشد')
            ,
            check('permissions')
                .not().isEmpty()
                .withMessage('دسترسی انتخاب نشده')
            ,
        ]
    }
}


module.exports = new RoleValidation();