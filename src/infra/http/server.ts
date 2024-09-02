import express from 'express';
import RabbitMQProducer from '../queue/rabbitMQ/RabbitMQProducer';
import SendMessage from '../../application/useCases/SendMessage';
import crypto from 'crypto';
import { LoremIpsum } from "lorem-ipsum";
import compression from "compression";

export const createServer = () => {

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

    const app = express();
    app.use(compression());

    app.get("/", (req, res) => {
        res.json({
            wellcome: "Bee Messenger"
        })
    })

    app.post("/produce-message", async (req, res) => {
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
        res.json(output);
    });

    const port = 3000

    app.listen(port, () => {
        console.log(`Servidor iniciado na porta ${port}`);
    });
}