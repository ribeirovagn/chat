import RabbitMQConnection from "./RabbitMQConnection";
import RabbitMQConsumer from "./RabbitMQConsumer";
import RabbitMQQueue from "./RabbitMQQueue";

export default class RabbitMQConsumerFactory {
  static async read(queueName: string, pattern: string = "") {
    const rabbitMQ = RabbitMQConnection.getInstance();
    const connection = await rabbitMQ.getConnection();
    const channel = await connection?.createChannel();
    if(channel){ 
      const queue = new RabbitMQQueue(channel, queueName, pattern);
      return new RabbitMQConsumer(channel, queue);
    }

    throw new Error("Ocorreu um erro");
    
  }
}
