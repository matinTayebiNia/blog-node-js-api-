const controller = require("app/http/controllers/api/controller")
const Comment = require("app/models/comment.model")

class CommentController extends controller {
    async index(req, res) {
        try {
            if (this.isMongoId(req.params.id,res)) return;
            const commentsOfArticle = await Comment.find({ parent: null, approved: true, article: req.params.id })
                .populate([{ path: "user", select: "name" }, { path: "childComment", populate: { path: "user", select: "name" } }])
            return this.returnSuccessMessage(res, this.setCommentArticle(commentsOfArticle));
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
    setCommentArticle(comments) {
        return {
            comments: comments.map(comment => {
                return {
                    author: comment.user.name,
                    parent: comment.parent,
                    approved: comment.approved,
                    comment: comment.comment,
                    childComment: comment.childComment.map(item => {
                        return {
                            author: item.user.name,
                            parent: item.parent,
                            approved: item.approved,
                            comment: item.comment,
                        }
                    })
                }
            })
        }
    }


    async addComment(req, res) {
        try {
            if (this.isMongoId(req.params.id,res)) return;
            if (!this.ValidationData(req, res)) return;
            const { parent, comment } = req.body;
            let newComment = new Comment({
                user: req.user.id,
                parent,
                comment,
                article: req.params.id
            })
            await newComment.save();
            return this.returnSuccessMessage(res, "نظر شما بعد از تایید در بخش نظرات مقاله قرار میگیرد.")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }
}

module.exports = new CommentController()