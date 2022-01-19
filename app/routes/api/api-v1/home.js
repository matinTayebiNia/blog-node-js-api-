const {Router} = require("express")
const routes = Router();

//controllers
const articleController = require("app/http/controllers/api/api-v1/home/articleController")
const categoryController = require("app/http/controllers/api/api-v1/home/categoryController")
const {index} = require("app/http/controllers/api/api-v1/home/commentController")

//article routes




routes.get("/articles", articleController.index);

routes.get("/articles/:slug", articleController.singleArticle)

routes.get("/comments/articles/:id", index)

//category routes
routes.get("/categories", categoryController.index)
routes.get("/categories/:slug", categoryController.searchCategory)

//home apis documentation
/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Returns the list of all the articles
 *     tags: [home]
 *     responses:
 *       200:
 *         description: The list of the article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *
 * /api/v1/articles/:slug:
 *   get:
 *     summary: Return the spacial article
 *     tags: [home]
 *     responses:
 *       200:
 *         description: the spacial article (need slug id)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *
 * /api/v1/comments/articles/:id:
 *   get:
 *     summary: get comment of article (need article id)
 *     tags: [home]
 *     responses:
 *       200:
 *         description: get comment of article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 * /api/v1/categories:
 *   get:
 *     summary: get all categories
 *     tags: [home]
 *     responses:
 *       200:
 *         description: all category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 * /api/v1/categories/:slug:
 *   get:
 *     summary: show article from category
 *     tags: [home]
 *     responses:
 *       200:
 *         description: article of category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *
 *
 */

module.exports = routes;