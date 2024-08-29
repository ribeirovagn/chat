import FetchMessages from "../src/application/useCases/FetchMessages";
import ReceiveMessage from "../src/application/useCases/ReceiveMessage";
import SendMessage from "../src/application/useCases/SendMessage";
import RabbitMQConsumerFactory from "../src/infra/queue/rabbitMQ/RabbitMQConsumerFactory";
import RabbitMQProducer from "../src/infra/queue/rabbitMQ/RabbitMQProducer";
import MessageRepositoryPostgres from "../src/infra/repository/postgres/MessageRepositoryPostgres";

test("Deve enviar uma mensagem", async () => {
  const producer = new RabbitMQProducer();
  const sendMessage = new SendMessage(producer);

  const input = {
    sender: {
      name: "Vagner Ribeiro",
      email: "ribeirovagn@gmail.com",
      id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
    },
    recipient: {
      name: "Fedora Ribeiro",
      email: "vagn.fedora@gmail.com",
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    },
    message:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  };

  const output = await sendMessage.execute(input);
});

test("Deve ler as mensagens", async () => {
  const consumer = await RabbitMQConsumerFactory.read("message-sending");
  const messageRepository = new MessageRepositoryPostgres();
  const receive = new ReceiveMessage(consumer, messageRepository);

  await receive.execute();
});

test("Deve recuperar mensagens enviada para um usuario", async () => {

  const messageRepository = new MessageRepositoryPostgres();
  const fetchMessage = new FetchMessages(messageRepository);

  const input = {
    name: "Fedora Ribeiro",
    email: "vagn.fedora@gmail.com",
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
  };
  const output = await fetchMessage.execute(input);
  
  
});
