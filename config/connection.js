const mongoose = require('mongoose');

module.exports = {
    setMongoConnection: () => {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_URL, config.database.mongooseOption, (err) => {
            if (err) console.log(err)
        })
    }
}