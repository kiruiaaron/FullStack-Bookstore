//Email configuration

require ("dotenv").config()

const email_config ={
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
}
module.exports = email_config;