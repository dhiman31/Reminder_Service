const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

let channel;

const createChannel = async () => {
  if (channel) return channel;

  const connection = await amqplib.connect(MESSAGE_BROKER_URL);
  channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

  console.log('RabbitMQ channel ready');
  return channel;
};

const subscribeMessage = async (queueName, bindingKey, service) => {
  if (!channel) throw new Error('Channel not initialized');

  const q = await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(q.queue, EXCHANGE_NAME, bindingKey);

  channel.consume(q.queue, async (msg) => {
  try {
    const data = JSON.parse(msg.content.toString());

    await service(data);

    channel.ack(msg);
  } catch (error) {
    console.error('Message processing failed:', error.message);
    channel.nack(msg, false, false); 
  }
  });

};

module.exports = {
  createChannel,
  subscribeMessage
};
