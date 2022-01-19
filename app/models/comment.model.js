const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    article: {type: Schema.Types.ObjectId, ref: 'Article', default: undefined},
    parent: {type: Schema.Types.ObjectId, ref: 'Comment', default: null},
    approved: {type: Boolean, required: true, default: false},
    comment: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true}})

CommentSchema.plugin(mongoosePaginate);

CommentSchema.virtual('childComment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parent',
})



module.exports = mongoose.model('Comment', CommentSchema);