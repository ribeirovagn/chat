import ReceiveMessage from "../src/application/useCases/ReceiveMessage";
import SendMessage from "../src/application/useCases/SendMessage";
import RabbitMQConnection from "../src/infra/queue/rabbitMQ/RabbitMQConnection";
import RabbitMQConsumer from "../src/infra/queue/rabbitMQ/RabbitMQConsumer";
import RabbitMQProducer from "../src/infra/queue/rabbitMQ/RabbitMQProducer";
import RabbitMQQueue from "../src/infra/queue/rabbitMQ/RabbitMQQueue";
import MessageRepositoryPostgres from "../src/infra/repository/postgres/MessageRepositoryPostgres";

test("Deve enviar uma mensagem", async () => {
  const producer = new RabbitMQProducer();
  const sendMessage = new SendMessage(producer);

  const input = {
    sender: {
      name: "Vagner Ribeiro",
      email: "ribeirovagn@gmail.com",
    },
    recipient: {
      name: "Fedora Ribeiro",
      email: "vagn.fedora@gmail.com",
    },
    message:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  };

  const output = await sendMessage.execute(input);
  
});

test("Deve ler as mensagens", async () => {
    const channel = await RabbitMQConnection.getChannel();
    const queue = new RabbitMQQueue(channel, "message-sending", "");
    const consumer = new RabbitMQConsumer(channel, queue);

    const messageRepository = new MessageRepositoryPostgres();

    const receive = new ReceiveMessage(consumer, messageRepository);

    await receive.execute();
});
