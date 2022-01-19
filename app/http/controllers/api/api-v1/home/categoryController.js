const controller = require("app/http/controllers/api/controller")
const Category = require("app/models/category.model")

class CategoryController extends controller {
    async index(req, res) {
        try {
            const categories = await this.getMultiLevelCategory()
            return this.returnSuccessMessage(res, categories)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async searchCategory(req, res) {
        try {
            const articles = await Category.findOne({ slug: req.params.slug })
                .populate([{ path: "articles", select: "title viewCount CommentCount likes" }])
            if (articles)
                return this.returnSuccessMessage(res, this.setSingleCategory(articles));
            else
                return this.failed("نتیجه ای یافت نشد", res, 404)
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    setSingleCategory(articles) {
        return {
            name: articles.name,
            slug: articles.slug,
            id: articles._id,
            articles: articles.articles.map(article => {
                return {
                    title: article.title,
                    viewCount: article.viewCount,
                    CommentCount: article.CommentCount,
                    likes: article.likes
                }
            })
        }
    }
}


module.exports = new CategoryController();