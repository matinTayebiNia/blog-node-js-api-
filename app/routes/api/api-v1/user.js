const {Router} = require("express")
const routes = Router();

//controllers
const articleController = require("app/http/controllers/api/api-v1/home/articleController")
const commentController = require("app/http/controllers/api/api-v1/home/commentController")

//validations
const commentValidation = require("app/http/validations/api/commentValidation")

routes.post("/like/article/:id", articleController.likeArticle)
routes.post("/add-comment/article/:id", commentValidation.handel(), commentController.addComment)

// user apis documentation
/**
 * @swagger
 * /api/v1/user/like/article/:id:
 *   post:
 *     summary: like or dislike an article (the user most authenticated and need article id )
 *     tags: [user]
 *     responses:
 *       200:
 *         description: like or dislike an article (the user most authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/like'
 * /api/v1/user/add-comment/article/:id:
 *   post:
 *     summary: add comment to  article (the user most authenticated and need article id )
 *     tags: [user]
 *     responses:
 *       200:
 *         description: add comment to  article (the user most authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comment'
 *
 *
 *
 *
 */


module.exports = routes;