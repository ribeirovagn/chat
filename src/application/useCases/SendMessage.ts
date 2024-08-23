import Message from "../../domain/entities/Message"
import Producer from "../queue/Producer";

export default class SendMessage {

    constructor(readonly producer: Producer) {}

    async execute(input: Input): Promise<Message> {
        const time = new Date().getTime();
        const message = Message.create(input.message, time, input.from, input.subject);
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
        email: string
    },
    recipient: {
        name: string,
        email: string
    },
    message: string
}