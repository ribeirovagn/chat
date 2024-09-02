import FetchMessages from "../src/application/useCases/FetchMessages";
import SendMessage from "../src/application/useCases/SendMessage";
import Message from "../src/domain/entities/Message";
import RabbitMQProducer from "../src/infra/queue/rabbitMQ/RabbitMQProducer";
import MessageRepositoryPostgres from "../src/infra/repository/postgres/MessageRepositoryPostgres";

import { LoremIpsum } from "lorem-ipsum";
import crypto from "crypto";
import PoolConnection from "../src/infra/repository/postgres/PoolConnection";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 10,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 3
  }
});

test("Deve enviar uma mensagem", async () => {

  const producer = new RabbitMQProducer();
  const sendMessage = new SendMessage(producer);
  const randInt = crypto.randomInt(3, 8);

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
      message: lorem.generateWords(randInt)
    };
    const output = await sendMessage.execute(input);
    expect(output).toBeInstanceOf(Message);
  

});



test("Deve recuperar mensagens enviadas para um usuário", async () => {
  const databaseConnection = new PoolConnection();
  const messageRepository = new MessageRepositoryPostgres(databaseConnection);
  const fetchMessage = new FetchMessages(messageRepository);
  const input = {
    name: "Fedora Ribeiro",
    email: "vagn.fedora@gmail.com",
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
  };
  const output = await fetchMessage.execute(input);
  await databaseConnection.close();
  expect(output).toBeInstanceOf(Array<Message>);
});