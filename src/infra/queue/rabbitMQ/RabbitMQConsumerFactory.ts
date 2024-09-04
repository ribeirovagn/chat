import RabbitMQConnection from "./RabbitMQConnection";
import RabbitMQConsumer from "./RabbitMQConsumer";
import RabbitMQQueue from "./RabbitMQQueue";

export default class RabbitMQConsumerFactory {
  static async read(queueName: string, pattern: string = "") {
    try {
      const rabbitMQ = RabbitMQConnection.getInstance();
      const connection = await rabbitMQ.getConnection();
      const channel = await connection?.createChannel();
      const queue = new RabbitMQQueue(channel, queueName, pattern);
      return new RabbitMQConsumer(channel, queue);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
