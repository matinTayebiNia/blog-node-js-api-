const nodeMailer = require("nodemailer")

module.exports = {
    transporter: nodeMailer.createTransport({
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL,
        secure: false, // true for 465, false for other ports
        requireTLC: true,
        auth: {
            user: process.env.USERNAME_MAIL, // generated ethereal user
            pass: process.env.PASSWORD_MAIL, // generated ethereal password
        },
    })
}
