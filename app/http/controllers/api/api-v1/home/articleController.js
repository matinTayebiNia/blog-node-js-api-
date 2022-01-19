const controller = require("app/http/controllers/api/controller")
const Article = require("app/models/article.model")
const Like = require("app/models/like.model")

class ArticleController extends controller {

    async index(req, res) {
        try {
            const options = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: 1},
                populate: [{path: "user", select: "name "}]
            };
            let articles = await Article.paginate({}, options);
            return this.returnSuccessMessage(res, this.getArticles(articles))
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    getArticles(articles) {
        return {
            docs: articles.docs.map(article => {
                return {
                    id: article._id,
                    author: article.user.name,
                    title: article.title,
                    thumb: article.thumb,
                    tags: article.tags,
                    slug: article.slug,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    likes: article.likes,
                    viewCount: article.viewCount,
                    commentCount: article.CommentCount
                }
            }),
            "totalDocs": articles.totalDocs,
            "limit": articles.limit,
            "totalPages": articles.totalPages,
            "page": articles.page,
            "pagingCounter": articles.pagingCounter,
            "hasPrevPage": articles.hasPrevPage,
            "hasNextPage": articles.hasNextPage,
            "prevPage": articles.prevPage,
            "nextPage": articles.nextPage
        }

    }


    async singleArticle(req, res) {
        try {
            const article = await Article.findOneAndUpdate({slug: req.params.slug}, {$inc: {viewCount: 1}})
                .populate([{path: 'user', select: 'name'}])
                .populate("categories");
            if (article)
                return this.returnSuccessMessage(res, this.getSingleArticles(article))
            else
                return this.failed("مقاله مورد نظر یافت نشد", res, 404)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    getSingleArticles(article) {
        return {
            id: article._id,
            slug: article.slug,
            author: article.user.name,
            title: article.title,
            body: article.body,
            thumb: article.thumb,
            tags: article.tags,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            categories: article.categories.map(category => {
                return {
                    name: category.name
                }
            }),
            likes: article.likes,
            viewCount: article.viewCount,
            commentCount: article.CommentCount
        }
    }

    async likeArticle(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            const article = await Article.findById(req.params.id)
            const liked = await Like.findOne({
                $and: [{article: req.params.id},
                    {user: req.user.id}]
            }).populate({path: "article", select: "likes"}).exec()
            if (liked) {
                await article.decr("likes", 1)
                await liked.remove();
                return this.returnSuccessMessage(res, "شما مقاله را دیس لایک کردید")
            } else {
                const newLike = new Like({
                    article: req.params.id,
                    user: req.user.id
                })
                await newLike.save();
                article.incr("likes")
                return this.returnSuccessMessage(res, "شما مقاله را لایک کردید")
            }
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}


module.exports = new ArticleController();