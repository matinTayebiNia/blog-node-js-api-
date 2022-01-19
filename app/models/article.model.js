const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const article = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, unique: true, required: true},
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    slug: {type: String, required: true},
    body: {type: String, required: true},
    images: {type: Object},
    thumb: {type: String, required: true},
    tags: {type: String, required: true},
    viewCount: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    CommentCount: {type: Number, default: 0},
}, {timestamps: true, toJSON: {virtuals: true}})

article.plugin(mongoosePaginate);


article.methods.incr = async function (column, increment = 1) {
    this[column] += increment
    await this.save()
}

article.methods.decr = async function (column, increment = 1) {
    this[column] -= increment
    await this.save()
}

article.virtual('comment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'course',
})


article.virtual('like', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'article',
})


module.exports = mongoose.model('Article', article);