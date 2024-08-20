import User from "../../domain/entities/User";
import Producer from "../queue/Producer";

export default class ReceiveMessage {

    constructor(readonly producer: Producer) { }

    execute(input: Input): Promise<void> {

        
    }

}

type Input = {
    from: User,
    subject: User,
    message: string,
}