const { subscribeMessage } = require('../utils/messageQueue');
const { REMINDER_QUEUE } = require('../config/serverConfig');
const { createNotification } = require('./reminderService');

const startConsumer = async () => {
  await subscribeMessage(
    REMINDER_QUEUE,
    'booking.confirmed',
    createNotification
  );
};

module.exports = {
  startConsumer
};
