const sender = require('../config/emailConfig');

const sendBasicEmail = async (mailFrom , mailTo , mailSubject , mailBody) => {
    await sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
    // html: "<b>Hello world?</b>", // HTML version of the message
  });
  console.log("Email Sent!!");
}


module.exports = sendBasicEmail;
