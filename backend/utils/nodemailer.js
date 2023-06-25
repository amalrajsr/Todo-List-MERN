const nodemailer= require('nodemailer')
require("dotenv").config();

 const MAIL_SETTINGS= {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
      
    },
    
  }
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports=transporter