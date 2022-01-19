const validation = require("app/http/validations/validation")
const {check} = require("express-validator")
const Article = require("app/models/article.model")
const path = require("path")

class ArticleValidation extends validation {
    handel() {
        return [
            check('title')
                .not().isEmpty()
                .withMessage('عنوان خالی میباشد.')
                .isLength({min: 3})
                .withMessage('عنوان کمتر از 3 کاراکتر میباشد')
                .custom(async (value, {req}) => {
                    if (req.query._method === 'put') {
                        let course = await Article.findById(req.params.id);
                        if (course.title === value) return;
                    }
                    let find = await Article.findOne({slug: this.slug(value)})
                    if (find) {
                        throw new Error('عنوان تکراری میباشد.')
                    }
                })
            ,
            check('images')
                .custom(async (value, {req}) => {
                    if (req.query._method === 'put' && value === undefined) return;
                    if (!value)
                        throw new Error('وارد کردن تصویر الزامی است.');
                    const fileExt = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', 'JPEG']
                    if (!fileExt.includes(path.extname(value)))
                        throw new Error('پسوند فایل باید از نوع png،jpg،jpeg باشد ')
                })
            ,
            check('body')
                .not().isEmpty()
                .withMessage('توضیحات دوره وارد نشده')
            ,
            check('categories')
                .not().isEmpty()
                .withMessage('دسته بندی دوره انتخاب نشده')

            , check('tags')
                .not().isEmpty()
                .withMessage('تگ وارد نشده ')
                .isLength({min: 3})
                .withMessage('تگ وارد شده کمتر از 3 کاراکتر میباشد.')
        ]
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }
}

module.exports = new ArticleValidation();