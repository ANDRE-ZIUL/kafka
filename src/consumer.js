import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['107.21.137.193:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  await consumer.connect();
  
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

runConsumer().catch(console.error);
