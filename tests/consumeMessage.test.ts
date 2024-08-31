import ReceiveMessage from "../src/application/useCases/ReceiveMessage";
import RabbitMQConsumerFactory from "../src/infra/queue/rabbitMQ/RabbitMQConsumerFactory";
import MessageRepositoryPostgres from "../src/infra/repository/postgres/MessageRepositoryPostgres";
import PoolConnection from "../src/infra/repository/postgres/PoolConnection";

test("Deve ler as mensagens da fila e gravar no banco de dados", async () => {
  const consumer = await RabbitMQConsumerFactory.read("message-sending");
  const databaseConnection = new PoolConnection();
  const messageRepository = new MessageRepositoryPostgres(databaseConnection);
  const receive = new ReceiveMessage(consumer, messageRepository);
  await receive.execute();
  await databaseConnection.close();
});