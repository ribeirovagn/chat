import MessageRepository from "../../../application/repositories/MessageRepository";
import Message from "../../../domain/entities/Message";
import User from "../../../domain/entities/User";
import PoolConnection from "./PoolConnection";

export default class MessageRepositoryPostgres implements MessageRepository {
    
    async create(message: Message): Promise<void> {
        const connection = await PoolConnection.getInstance();
        const query = `INSERT INTO ${process.env.DB_NAME}.messages(id, sender, recipient, message, send_at) VALUES($1, $2, $3, $4, $5)`;
        const values = [message.id, message.sender.id, message.recipient.id, message.text, message.time];
        await connection.query(query, values);
    }

    async findByUser(user: User): Promise<Message> {
        throw new Error("Method not implemented.");
    }

}