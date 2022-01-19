const {Router} = require("express")
const routes = Router();

//controller
const forgotAndRestPasswordController = require("app/http/controllers/api/api-v1/Auth/forgotAndRestPasswordController");
const loginController = require("app/http/controllers/api/api-v1/Auth/loginController");
const registerController = require("app/http/controllers/api/api-v1/Auth/registerController");
//validations
const RegisterValidation = require("app/http/validations/api/registerValidation")
const loginValidation = require('app/http/validations/api/loginValidation')
const ForgotValidation = require("app/http/validations/api/forgotValidation")
const ResetPasswordValidation = require("app/http/validations/api/resetPasswordValidation")

//routes
routes.post("/register", RegisterValidation.handel(), registerController.register)
routes.post("/login", loginValidation.handel(), loginController.login)
routes.post("/forgot-password", ForgotValidation.handel(), forgotAndRestPasswordController.sendResetLink)
routes.post("/reset-password/:token", ResetPasswordValidation.handel(), forgotAndRestPasswordController.ResetPassword)

//auth apis documentation
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: register user
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: register user should return access token
 * /api/v1/auth/login:
 *   post:
 *     summary: login user
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: login user should return access token
 *
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: this route send forgot-password email to your email
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: forgot-password should send an email
 * /api/v1/auth/reset-password/:token:
 *   post:
 *     summary: this route for change password's user (need token)
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: this route for change password's user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/password-reset'
 *
 *
 *
 * */


module.exports = routes;