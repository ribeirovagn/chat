import RabbitMQConnection from "./RabbitMQConnection";
import RabbitMQConsumer from "./RabbitMQConsumer";
import RabbitMQQueue from "./RabbitMQQueue";

export default class RabbitMQConsumerFactory {
  static async read(queueName: string, pattern: string = "") {
    const channel = await RabbitMQConnection.getChannel();
    const queue = new RabbitMQQueue(channel, queueName, pattern);
    return new RabbitMQConsumer(channel, queue);
  }
}
