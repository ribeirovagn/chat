import ReceiveMessage from "./application/useCases/ReceiveMessage";
import RabbitMQConsumerFactory from "./infra/queue/rabbitMQ/RabbitMQConsumerFactory";
import MessageRepositoryPostgres from "./infra/repository/postgres/MessageRepositoryPostgres";
import PoolConnection from "./infra/repository/postgres/PoolConnection";

async function main() {

    const consumer = await RabbitMQConsumerFactory.read("message-sending");
    const databaseConnection = new PoolConnection();
    const messageRepository = new MessageRepositoryPostgres(databaseConnection);
    const receive = new ReceiveMessage(consumer, messageRepository);
    await receive.execute();
    await databaseConnection.close();
}

main();