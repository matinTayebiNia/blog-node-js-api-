const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema({
    name: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
}, {timestamps: true, toJSON: {virtuals: true}});

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
    //با اضافه کردن این خط در صورتی که رمز عبور تغییر نکرده باشه کدهای بعدی اجرا نمیشه
    if (!this.isModified('password')) return next();
    let salt = Bcrypt.genSaltSync(15);
    this.password = Bcrypt.hashSync(this.password, salt);
    next()
})

UserSchema.methods.comparePassword = function (password) {
    return Bcrypt.compareSync(password, this.password);
}

UserSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'user'
})

UserSchema.methods.hasRoles = function (roles) {
    let result = roles.filter(role => {
        return this.roles.indexOf(role) > -1;
    })
    return !!result.length;
}

UserSchema.methods.getDataOfUser = function () {
    return {
        name:this.name,
        email:this.email,
        admin:this.admin,
    }
}


module.exports = mongoose.model('User', UserSchema);
