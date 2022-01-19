module.exports = {
    url: process.env.DB_URL,
    mongooseOption: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}