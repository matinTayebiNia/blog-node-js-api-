const {Router} = require("express")
const routes = Router();

//controllers
const articleController = require("app/http/controllers/api/api-v1/Admin/articleController")
const categoryController = require("app/http/controllers/api/api-v1/Admin/categoryController")
const permissionController = require("app/http/controllers/api/api-v1/Admin/permissionController")
const roleController = require("app/http/controllers/api/api-v1/Admin/roleController")
const commentController = require("app/http/controllers/api/api-v1/Admin/commentController")
const UserController = require("app/http/controllers/api/api-v1/Admin/userController")
const likeController = require("app/http/controllers/api/api-v1/Admin/likeController")

//validations
const articleValidation = require("app/http/validations/api/articleValidation")
const categoriesValidation = require("app/http/validations/api/categoriesValidation")
const permissionValidation = require("app/http/validations/api/permissionValidation")
const roleValidation = require("app/http/validations/api/roleValidation")
const registerValidation = require("app/http/validations/api/registerValidation")
const userValidation = require("app/http/validations/api/userValidation")

//middleware
const convertFileToFiled = require("app/http/middleware/convertFileToField")

//Helpers
const upload = require("app/Helpers/uploadImage")
const gate = require('app/Helpers/gate')

//articles routes
routes.get("/article", gate.can("show-article"), articleController.index)
routes.post("/article/create", gate.can("create-article"), upload.single('images'), convertFileToFiled.handel, articleValidation.handel(), articleController.store)
routes.put("/article/update/:id", gate.can("update-article"), upload.single('images'), convertFileToFiled.handel, articleValidation.handel(), articleController.update)
routes.delete("/article/delete/:article_id", gate.can("destroy-article"), articleController.destroy)

//categories routes
routes.get("/categories", gate.can("show-category"), categoryController.index)
routes.post("/categories/create", gate.can("create-category"), categoriesValidation.handel(), categoryController.store)
routes.put("/categories/update/:id", gate.can("update-category"), categoriesValidation.handel(), categoryController.update)
routes.delete("/categories/delete/:id", gate.can("destroy-category"), categoryController.destroy)

//permission routes
routes.get("/permissions", gate.can("show-permission"), permissionController.index);
routes.post("/permissions/create", gate.can("create-permission"), permissionValidation.handel(), permissionController.store);
routes.put("/permissions/update/:id", gate.can("update-permission"), permissionValidation.handel(), permissionController.update);
routes.delete("/permissions/delete/:id", gate.can("destroy-permission"), permissionController.destroy);

//roles routes
routes.get("/roles", gate.can("show-role"), roleController.index);
routes.post("/roles/create", gate.can("create-role"), roleValidation.handel(), roleController.store);
routes.put("/roles/update/:id", gate.can("update-role"), roleValidation.handel(), roleController.update);
routes.delete("/roles/delete/:id", gate.can("destroy-role"), roleController.destroy);

//comments routes
routes.get("/comment/approved", gate.can("approved-comment"), commentController.approved)
routes.get("/comment/unapproved", gate.can("unapproved-comment"), commentController.unapproved)
routes.put("/comment/update/:id", gate.can("update-comment"), commentController.update)
routes.delete("/comment/delete/:id", gate.can("delete-comment"), commentController.destroy)

//user routes
routes.get("/users", gate.can("show-user"), UserController.index);
routes.post("/users/create", gate.can("create-user"), registerValidation.handel(), UserController.store)
routes.put("/users/update/:id", gate.can("update-user"), userValidation.handel(), UserController.update)
routes.put("/users/add-roles/:id", gate.can("addRole-user"), UserController.storeRoleOfUser)

//like routes
routes.get("/likes",gate.can("show-like"), likeController.index)

//admin api documentation
// article api documentation
/**
 * @swagger
 * /api/v1/admin/article:
 *   get:
 *     summary: show articles
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 * /api/v1/admin/article/create:
 *   post:
 *     summary: create article
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: create article
 *         content:
 *           application/form-data:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 * /api/v1/admin/article/update/:id:
 *   put:
 *     summary: update article (need article id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update article
 *         content:
 *           application/form-data:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 * /api/v1/admin/article/update/:article_id:
 *   delete:
 *     summary: delete article (need article id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: delete article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *
 *
 *
 * */
// categories api documentation
/**
 * @swagger
 * /api/v1/admin/categories:
 *   get:
 *     summary: show categories
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 * /api/v1/admin/categories/create:
 *   post:
 *     summary: create category
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: create categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 * /api/v1/admin/categories/update/:id:
 *   put:
 *     summary: update category (need category id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 * /api/v1/admin/categories/delete/:id:
 *   delete:
 *     summary: delete category (need category id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: delete categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 *
 * */
//permission api documentation
/**
 * @swagger
 * /api/v1/admin/permissions:
 *   get:
 *     summary: show permissions
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/permission'
 * /api/v1/admin/permissions/create:
 *   post:
 *     summary: create permission
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: create categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/permission'
 * /api/v1/admin/permissions/update/:id:
 *   put:
 *     summary: update permission (need permission id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update permission
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/permission'
 * /api/v1/admin/permissions/delete/:id:
 *   delete:
 *     summary: delete permission (need permission id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: delete permission
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/permission'
 *
 * */
//role api documentation
/**
 * @swagger
 * /api/v1/admin/roles:
 *   get:
 *     summary: show role
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: all role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/role'
 * /api/v1/admin/roles/create:
 *   post:
 *     summary: create role
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: create role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/role'
 * /api/v1/admin/roles/update/:id:
 *   put:
 *     summary: update role (need role id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/role'
 * /api/v1/admin/roles/delete/:id:
 *   delete:
 *     summary: delete role (need role id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: delete role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/role'
 *
 * */
//comment api documentation
/**
 * @swagger
 * /api/v1/admin/comment/approved:
 *   get:
 *     summary: show approved comment
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: show approved comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 * /api/v1/admin/comment/unapproved:
 *   get:
 *     summary: show unapproved comment
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: show unapproved comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 * /api/v1/admin/comment/update/:id:
 *   put:
 *     summary: update comment (need comment id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 * /api/v1/admin/comment/delete/:id:
 *   delete:
 *     summary: delete comment (need comment id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: delete comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 *
 * */
//user api documentation
/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: show users
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: show users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 * /api/v1/admin/users/create:
 *   post:
 *     summary: show users
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: show users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 * /api/v1/admin/users/update/:id:
 *   put:
 *     summary: update user (need user id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: update user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 * /api/v1/admin/users/add-roles/:id:
 *   put:
 *     summary: add role for user (need user id)
 *     tags: [admin(you most have authorization)]
 *     responses:
 *       200:
 *         description: add role for user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *
 * */
module.exports = routes;