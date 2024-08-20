import { OptsProducer } from "../../infra/queue/rabbitMQ/RabbitMQProducer";

export default interface Producer {
    init(message: any, opts: OptsProducer):Promise<void>;
}