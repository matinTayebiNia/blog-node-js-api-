const controller = require("app/http/controllers/api/controller")
const Like = require("app/models/like.model")

class LikeController extends controller {

    async index(req, res) {
        try {
            const options = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: 1},
                populate: [{path: "user", select: "name"}, {path: "article", select: "title"}]
            };
            let likes = await Like.paginate({}, options);
            return this.returnSuccessMessage(res, this.getLikes(likes))
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    getLikes(likes) {
        return {
            docs: likes.docs.map(like => {
                return {
                    liker: like.user.name,
                    article: like.article.title,
                }
            }),
            "totalDocs": likes.totalDocs,
            "limit": likes.limit,
            "totalPages": likes.totalPages,
            "page": likes.page,
            "pagingCounter": likes.pagingCounter,
            "hasPrevPage": likes.hasPrevPage,
            "hasNextPage": likes.hasNextPage,
            "prevPage": likes.prevPage,
            "nextPage": likes.nextPage
        }
    }

}


module.exports = new LikeController();