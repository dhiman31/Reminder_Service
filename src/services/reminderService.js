const sender = require('../config/emailConfig');
const ReminderRepository = require('../repository/reminderRepository')

const reminderRepo = new ReminderRepository();

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


const createNotification = async (data) => {
    try {
      const { subject, content, notificationTime, recepientEmail } = data;

      if (!subject || !content || !notificationTime || !recepientEmail) {
      throw new Error('Invalid notification payload');
      }

      const notification = await reminderRepo.createNotification(data);
      return notification;

    } catch (error) {
      throw error;
    }
}

const fetchAll = async () => {
  try {
      const notification = await reminderRepo.fetchAll();
      return notification;
  } catch (error) {
    throw error;
  }
}

const fetchAllPending = async () => {
  try {
      const notifications = await reminderRepo.fetchAllPending({status:'PENDING'});
      return notifications;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  sendBasicEmail,
  createNotification,
  fetchAll,
  fetchAllPending
};
