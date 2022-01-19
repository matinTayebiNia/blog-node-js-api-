const controller = require("app/http/controllers/api/controller")
const Role = require("app/models/role.model")

class RoleController extends controller {
    async index(req, res) {
        try {
            const option = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: -1},
                populate: [{path: "permissions", select: "name label"}]
            }
            const roles = await Role.paginate({}, option)
            return this.returnSuccessMessage(res, roles)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async store(req, res) {
        try {
            if (!this.ValidationData(req, res)) return;
            const {name, permissions, label} = req.body;
            const newRole = new Role({
                name,
                label,
                permissions
            });
            await newRole.save();
            return this.returnSuccessMessage(res, "مقام مورد نظر با موفقیت ثبت شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            if (!this.ValidationData(req, res)) return;
            const {name, permissions, label} = req.body;

            await Role.findByIdAndUpdate(req.params.id, {
                name,
                label,
                permissions
            })
            return this.returnSuccessMessage(res, "مقام مورد نظر با موفقیت ویرایش شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async destroy(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            await Role.findByIdAndDelete(req.params.id);
            return this.returnSuccessMessage(res, "مقام مورد نظر با موفقیت حذف شد")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new RoleController();