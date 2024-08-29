import Message from "../../domain/entities/Message";
import User from "../../domain/entities/User";
import MessageRepository from "../repositories/MessageRepository";

export default class FetchMessages {
    constructor(readonly messageRepository: MessageRepository) {}

    async execute(input: Input) : Promise<Message[]>{
        const user = new User(input.name, input.email, input.id);
        return await this.messageRepository.findByRecipient(user);
    }
}


type Input = {
    name: string,
    email: string, 
    id: string
}