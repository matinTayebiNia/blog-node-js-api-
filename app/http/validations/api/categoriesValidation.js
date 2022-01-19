const validation = require("app/http/validations/validation")
const {check} = require("express-validator");
const Category = require("app/models/category.model")

class CategoriesValidation extends validation {
    handel() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('عنوان خالی میباشد.')
                .isLength({min: 3})
                .withMessage('عنوان کمتر از 5 کاراکتر میباشد')
                .custom(async (value, {req}) => {
                    if (req.query._method === 'put') {
                        let category = await Category.findById(req.params.id);
                        if (category.name === value) return;
                    }
                    let find = await Category.findOne({slug: this.slug(value)})
                    if (find) {
                        throw new Error('عنوان تکراری میباشد.')
                    }
                })
            ,
            check('parent')
                .not().isEmpty()
                .withMessage('فیلد دسته پدر نمیتواند خالی بماند')
            ,
        ]
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }
}

module.exports=new CategoriesValidation();