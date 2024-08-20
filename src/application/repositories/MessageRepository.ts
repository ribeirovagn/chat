import Message from "../../domain/entities/Message";
import User from "../../domain/entities/User";

export default interface MessageRepository {
    create(message: Message): Promise<void>;
    findByUser(user: User): Promise<Message>;
}