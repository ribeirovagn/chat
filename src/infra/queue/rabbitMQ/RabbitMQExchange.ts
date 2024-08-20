import { Channel } from "amqplib";
import Json from "./application/helpers/Json";
import RabbitMQQueue from "./RabbitMQQueue";

export default class RabbitMQExchange {

    public constructor(
        readonly channel: Channel,
        readonly queue: RabbitMQQueue,
        readonly name: string,
        readonly type: ExchangeType = ExchangeType.DIRECT,
        readonly bindingKey: string = ""
    ) { }

    public async assert(_durable: boolean = false) {

        const options = {
            durable: _durable,
            internal: undefined,
            autoDelete: undefined,
            alternateExchange: undefined,
            arguments: null
        }

        await this.channel.assertExchange(this.name, this.type, options);
    }

    public async bindQueue(): Promise<void> {
        await this.queue.bindExchange(this.name);
    }

    public async publishBindQueue(data: any): Promise<boolean> {

        const json = new Json(data);

        if (!json.isValid()) {
            throw new Error("Data must be a valid json");
        }

        await this.bindQueue();
        // await this.channel.checkExchange(this.name);
        return this.channel.publish(this.name, this.bindingKey, Buffer.from(data));
    }
}

export enum ExchangeType {
    DIRECT = "direct", // Precisa de uma bindKey
    TOPIC = "topic", // Extende DIRECT
    FANOUT = "fanout", // Envia pra todos que estão connectados nela
    HEADERS = 'headers',
    MATCH = "match"
}
