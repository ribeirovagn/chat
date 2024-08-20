import { Channel, ConsumeMessage, Message } from "amqplib";
import RabbitMQQueue from "./RabbitMQQueue";
import Json from "./application/helpers/Json";

export default class RabbitMQConsumer {

    constructor(
        readonly channel: Channel,
        readonly qeuue: RabbitMQQueue
    ) { }

    async init(callback: Function): Promise<void> {
        let count = 0;
        await this.channel.consume(this.qeuue.name, async (msg) => {

            if (msg) {

                const data = msg.content.toString();
                const _json = new Json(data);

                const message: Message = {
                    content: msg.content,
                    fields: msg.fields,
                    properties: msg.properties
                }

                if (_json.isValid()) {
                    try {
                        callback(data);
                        this.channel.ack(message, false);
                    } catch (error) {

                    }
                } else {
                    this.channel.nack(message, false, false);
                    console.error("Message type invalid", msg);
                }
            }

        }, {
            noAck: false
        });
    }

}