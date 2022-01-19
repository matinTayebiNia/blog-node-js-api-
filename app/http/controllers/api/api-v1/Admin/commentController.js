const controller = require("app/http/controllers/api/controller")
const Comment = require("app/models/comment.model")

class CommentController extends controller {
    async approved(req, res) {
        try {
            const options = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: -1},
                populate: [{path: 'user', select: "name"},
                    {path: "article", select: "title number"}]
            }
            const comments = await Comment.paginate({approved: true}, options)
            return this.returnSuccessMessage(res, comments)

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async unapproved(req, res) {
        try {
            const options = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: -1},
                populate: [{path: 'user', select: "name"},
                    {path: "article", select: "title number"}]
            }
            const comments = await Comment.paginate({approved: false}, options)
            return this.returnSuccessMessage(res, comments)

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            let comment = await Comment.findById(req.params.id).populate('article')
            if (!comment) return this.failed("کامنت مورد نظر یافت نشد", res, 404)
            await comment.article.incr('CommentCount')
            comment.approved = true
            await comment.save();
            return this.returnSuccessMessage(res, "کامنت مورد نظر با موفقیت تایید شد.")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async destroy(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            let comment = await Comment.findById(req.params.id).populate('article')
            if (!comment) return this.failed("کامنت مورد نظر یافت نشد", res, 404)
            await comment.article.decr('CommentCount')
            await comment.remove();
            return this.returnSuccessMessage(res, "کامنت مورد نظر با موفقیت حذف شد.")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new CommentController();