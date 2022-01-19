const controller = require("app/http/controllers/api/controller")
const User = require("app/models/user.model")
const PasswordReset = require("app/models/password-reset.model")
const uniqueString = require('unique-string');
const sendForgotPasswordEmail = require("app/notifications/sendForgotPasswordEmail")

class ForgotAndRestPasswordController extends controller {

    async sendResetLink(req, res) {
        try {
            if (!await this.ValidationData(req, res)) return;
            let user = await User.findOne({email: req.body.email})
            if (!user) return this.failed("کاربری با ایمیل وارد شده وجود ندارد", res, 404)
            const newPasswordReset = new PasswordReset({
                email: req.body.email,
                token: uniqueString(),
            });
            await newPasswordReset.save();

            await sendForgotPasswordEmail(newPasswordReset, "فراموشی رمز عبور")
            return this.returnSuccessMessage(res, "فراموشی رمز عبور به ایمیل شما ارسال شد لطفا ایمیل خود را چک کنید")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }


    async ResetPassword(req, res) {
        try {
            if (!await this.ValidationData(req, res)) return;
            let field = await PasswordReset.findOne({
                $and: [{token: req.params.token},
                    {email: req.body.email}]
            })
            if (!field) return this.failed("اطلاعات وارد شده صحیح نمی باشد", res, 404)
            if (field.use) return this.failed("از این توکن برای بازیابی رمز عبور استفاده شده است", res, 403);
            let user = await User.findOne({email: field.email})
            if (!user) return this.failed("عملیات با موفقیت انجام نشد لطفا با پشتیبانی تماس بگیرید", res);
            user.password = req.body.password;
            await user.save();
            await field.update({use: true});

            return this.returnSuccessMessage(res, "رمز عبور شما با موفقیت تغییر کرد!")

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

}


module.exports = new ForgotAndRestPasswordController();