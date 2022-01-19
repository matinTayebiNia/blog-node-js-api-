const controller = require("app/http/controllers/api/controller")
const Category = require("app/models/category.model")

class CategoryController extends controller {
    async index(req, res) {
        try {
            let categories = await this.getMultiLevelCategory();
            return this.returnSuccessMessage(res, categories)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }



    async store(req, res) {
        try {
            if (!this.ValidationData(req, res)) return;
            const {name, parent} = req.body;
            const newCategory = new Category({
                name,
                parent: parent !== 'none' ? parent : null,
                slug: this.slug(name)
            });
            await newCategory.save();
            return this.returnSuccessMessage(res, "دسته بندی مورد نظر با موفقیت ثبت شد");
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        if (this.isMongoId(req.params.id)) return;
        if (!this.ValidationData(req, res)) return;
        const {name, parent} = req.body;

        await Category.findByIdAndUpdate(req.params.id, {
            name,
            parent: parent !== 'none' ? parent : null,
            slug: this.slug(name)
        })
        return this.returnSuccessMessage(res, "دسته بندی مورد نظر با موفقیت ویرایش شد");
    }

    async destroy(req, res) {
        try {
            if (this.isMongoId(req.params.id)) return;
            await Category.findByIdAndDelete(req.params.id)
            return this.returnSuccessMessage(res, "دسته بندی مورد نظر با موفقیت حذف شد");
        } catch (e) {
            return this.failed(e.message, res)
        }
    }


}

module.exports = new CategoryController();