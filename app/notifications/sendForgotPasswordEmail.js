const dayJs = require("dayjs")

const JobQueue = config.queueConfig

let transporter = config.mailer.transporter

JobQueue.define(
    "send_forgot_password_email",
    {priority: "high", concurrency: 10},
    async (job) => {
        const {to, token, subject} = job?.attrs?.data;
        await transporter.sendMail({
            to,
            from: '"blog" <supprot@blog.com>',
            subject, // Subject line
            html: `
            <h2>بازیابی رمز عبور</h2>
            <p>باید به ادرس زیر ایمیل و رمز جدید را ارسال کنیم!</p>
            <br>
           <p>
            token:${token}
            </p>
            address:${config.AppUrl}/api/v1/reset-password/${token}
            `,
        });
    }
);


module.exports = async (data, subject) => {
    await JobQueue.start()
    await JobQueue.schedule(dayJs().add(5, "seconds").format(),
        "send_forgot_password_email", {
            to: data.email,
            token: data.token,
            subject
        });
}

