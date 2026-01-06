const { PORT } = require('./config/serverConfig');
const {startConsumer} = require('./services/reminderConsumer');
const { setUpJobs } = require('./utils/job');
const { sequelize } = require('./models');
const { createChannel } = require('./utils/messageQueue');

const startServer = async () => {
  await sequelize.sync();

  await createChannel();
  await startConsumer();

  setUpJobs();

  console.log(`Reminder Service running on port ${PORT}`);
};

startServer();
