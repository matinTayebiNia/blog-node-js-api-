const controller = require("app/http/controllers/api/controller")
const User = require("app/models/user.model")

class UserController extends controller {
    async index(req, res) {
        try {
            const option = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: 1},
                populate: [{path: "roles", select: "name label"}]
            }
            const users = await User.paginate({}, option)
            return this.returnSuccessMessage(res, this.getUserData(users))
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    getUserData(users) {
        return {
            docs: users.docs.map(user => {
                return {
                    name: user.name,
                    admin: user.admin,
                    email: user.email,
                    roles: user.roles.map(role => {
                        return {
                            name: role.name,
                            label: role.label,
                        }
                    }),
                }
            }),
            "totalDocs": users.totalDocs,
            "limit": users.limit,
            "totalPages": users.totalPages,
            "page": users.page,
            "pagingCounter": users.pagingCounter,
            "hasPrevPage": users.hasPrevPage,
            "hasNextPage": users.hasNextPage,
            "prevPage": users.prevPage,
            "nextPage": users.nextPage
        }
    }

    async store(req, res) {
        try {
            if (!this.ValidationData(req, res)) return;
            const newUser = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            })
            await newUser.save()
            return this.returnSuccessMessage(res, "کاربر مورد نظر با موفقیت ثبت شد.")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        try {
            if (this.isMongoId(req.params.id)) return;
            if (!this.ValidationData(req, res)) return;
            const {name, email, password, admin} = req.body
            await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    fullName: name,
                    email: email,
                    password: password,
                    admin: admin
                }
            })
            return this.returnSuccessMessage(res, "کاربر مورد نظر با موفقیت ویرایش شد.")

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async storeRoleOfUser(req, res) {
        try {
            if (this.isMongoId(req.params.id)) return;
            const user = await User.findById(req.params.id);
            user.set({roles: req.body.roles});
            await user.save();
            return this.returnSuccessMessage(res, "دسترسی های مورد نظر برای کاربر مورد نظر ثبت شد.")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new UserController();