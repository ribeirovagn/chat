import Message from "../../domain/entities/Message";
import User from "../../domain/entities/User";
import RabbitMQConsumer from "../../infra/queue/rabbitMQ/RabbitMQConsumer";
import MessageRepository from "../repositories/MessageRepository";

export default class ReceiveMessage {

    constructor(readonly producer: RabbitMQConsumer, readonly messageRepository: MessageRepository) { }

    async execute(): Promise<void> {
        await this.producer.init(async(data: any) => {
            const sender = new User(data.sender.name, data.sender.email, data.sender.id);
            const recipient = new User(data.recipient.name, data.recipient.email, data.recipient.id);
            const date = new Date().getTime();
            const message = Message.create(data.text, date, sender, recipient);
            await this.messageRepository.create(message);
        });
    }
}


type Input = {
    sender: {
        name: string,
        email: string
    },
    recipient: {
        name: string,
        email: string
    },
    text: string
}