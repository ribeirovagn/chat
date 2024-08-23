import Message from "../../domain/entities/Message"
import User from "../../domain/entities/User";
import Producer from "../queue/Producer";

export default class SendMessage {

    constructor(readonly producer: Producer) {}

    async execute(input: Input): Promise<Message> {
        const time = new Date().getTime();
        const sender = new User(input.sender.name, input.sender.email, input.sender.id);
        const recipient = new User(input.recipient.name, input.recipient.email, input.recipient.id);
        const message = Message.create(input.message, time, sender, recipient);
        const parsed = JSON.stringify(message);

        // Enfileiramento de menssagens
        await this.producer.init(parsed, {
            queueName: "message-sending",
            exchangeName: "message",  
        });

        return message;
    }
}

type Input = {
    sender: {
        name: string,
        email: string,
        id: string
    },
    recipient: {
        name: string,
        email: string,
        id: string
    },
    message: string
}