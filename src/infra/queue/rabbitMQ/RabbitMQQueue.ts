import { Channel } from "amqplib";
import Json from "./application/helpers/Json";

export default class RabbitMQQueue {

    public constructor(
        readonly channel: Channel,
        readonly name: string,
        readonly pattern: string = ""
    ) { }


    public async assert(_durable: boolean = false): Promise<void> {
        await this.channel.assertQueue(this.name, {
            durable: _durable
        });
    }

    public async send(data: any): Promise<boolean> {
        try {
            const json = new Json(data);

            if (!json.isValid()) {
                throw new Error("Data must be a valid json");
            }

            await this.assert();
            return this.channel.sendToQueue(this.name, Buffer.from(data));
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async bindExchange(exchangeName: string): Promise<void> {
        try {
            await this.assert();
            await this.channel.bindQueue(this.name, exchangeName, this.pattern);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

enum QueueType {
    CLASSIC = "classic",
    QUORUM = "quorum",
    STREAM = 'stream'
}