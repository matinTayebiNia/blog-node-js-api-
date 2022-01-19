module.exports = {
    name: "session_blog-nodejs",
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    },
}