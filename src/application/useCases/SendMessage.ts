import Message from "../../domain/entities/Message"
import Producer from "../queue/Producer";

export default class SendMessage {

    constructor(readonly producer: Producer) {

    }

    async execute(input: Input): Promise<Output> {
        const time = new Date().getTime();
        const message = Message.create(input.message, time, input.from, input.subject);

        // Enfileiramento de menssagens
        this.producer.init(message, {
            queueName: "message-sending",
            exchangeName: "message",  
        });

        return { 
            message
        };
    }
}

type Input = {
    from: {
        name: string,
        email: string
    },
    subject: {
        name: string,
        email: string
    },
    message: string
}

type Output = {
    message: Message,
}