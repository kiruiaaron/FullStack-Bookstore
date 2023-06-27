//function to send mails

const {createTransport} = require("nodemailer");
require('dotenv').config();
const email_config = require('../config/Emailconfig');

const transporter = createTransport(email_config);

async function sendLoginMail(user_email, subject, text){
    const message_options = {
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: subject,
        text: text
    }
    try {
        let results =  await transporter.sendMail(message_options)
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

 async function sendMailBorrowedBook(email,bookTitle){
    const messageOptions ={
        to: email,
        from: process.env.EMAIL_USER,
        subject:"Borrow a book",
        text:`You have successfully borrowed a book title ${bookTitle}`
    }
    try {
        let results= await transporter.sendMail(messageOptions)
        console.log(results)
    } catch (error) {
        console.log(error)
    }
 }

 
 async function sendMailReturnBook(email,bookTitle){
    const messageOptions ={
        to: email,
        from: process.env.EMAIL_USER,
        subject:"Return a book",
        text:`You have successfully return a book title ${bookTitle}`
    }
    try {
        let results= await transporter.sendMail(messageOptions)
        console.log(results)
    } catch (error) {
        console.log(error)
    }
 }

 async function registerUser(email){
    const messageOptions ={
        to: email,
        from: process.env.EMAIL_USER,
        subject:"Return a book",
        text:`You have successfully register into a book bookstore `
    }
    try {
        let results= await transporter.sendMail(messageOptions)
        console.log(results)
    } catch (error) {
        console.log(error)
    }
 }


module.exports = {sendLoginMail,sendMailBorrowedBook,sendMailReturnBook,registerUser};