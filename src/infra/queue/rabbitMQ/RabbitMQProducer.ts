import RabbitMQQueue from "./RabbitMQQueue";
import RabbitMQExchange, { ExchangeType } from "./RabbitMQExchange";
import RabbitMQConnection from "./RabbitMQConnection";
import Producer from "../../../application/queue/Producer";

export default class RabbitMQProducer implements Producer{

    async init(data: Object, options: OptsProducer) {

        await RabbitMQConnection.getInstance();
        const queue = new RabbitMQQueue(RabbitMQConnection.channel, options.queueName, options.queuePattern);
        const exchange = new RabbitMQExchange(RabbitMQConnection.channel, queue, options.exchangeName, options.exchangeType, options.bindingKey);

        await exchange.assert(true);
        await exchange.publishBindQueue(data);
    }
}


export type OptsProducer = {
    queueName: string,
    exchangeName: string,
    queuePattern?: string,
    bindingKey?: string,
    exchangeType?: ExchangeType
}