const controller = require("app/http/controllers/api/controller")
const Permission = require("app/models/permission.model")

class PermissionController extends controller {
    async index(req, res) {
        try {
            const option = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: -1},
            }
            const permissions = await Permission.paginate({}, option)
            return this.returnSuccessMessage(res, permissions)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async store(req, res) {
        try {
            if (!this.ValidationData(req, res)) return;
            const {name, label} = req.body;
            const newPermission = new Permission({
                name,
                label
            });
            await newPermission.save();
            return this.returnSuccessMessage(res, "دسترسی مورد نظر با موفقیت ثبت شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            if (!this.ValidationData(req, res)) return;
            const {name, label} = req.body;
            await Permission.findByIdAndUpdate(req.params.id, {
                name,
                label,
            })
            return this.returnSuccessMessage(res, "دسترسی مورد نظر با موفقیت ویرایش شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async destroy(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            await Permission.findByIdAndDelete(req.params.id)
            return this.returnSuccessMessage(res, "دسترسی مورد نظر با موفقیت حذف شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new PermissionController();