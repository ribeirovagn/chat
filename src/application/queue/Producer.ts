import { OptsProducer } from "../../infra/queue/rabbitMQ/RabbitMQProducer";

export default interface Producer {
    init(message: Object, opts: OptsProducer):Promise<void>;
}