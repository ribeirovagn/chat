import Message from "../../domain/entities/Message";
import User from "../../domain/entities/User";

export default interface MessageRepository {
    create(message: Message): Promise<void>;
    findBySender(user: User): Promise<Message[]>;
    findByRecipient(user: User): Promise<Message[]>;
    updateStatus(message:Message): Promise<void>
}