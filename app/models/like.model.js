const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const likesSchema=new Schema({
    article:{type:Schema.Types.ObjectId,ref:"Article"},
    user:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps: true, toJSON: {virtuals: true}})

likesSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Like', likesSchema);
