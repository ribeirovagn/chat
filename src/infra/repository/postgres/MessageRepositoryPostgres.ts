import MessageRepository from "../../../application/repositories/MessageRepository";
import Message from "../../../domain/entities/Message";
import User from "../../../domain/entities/User";
import PoolConnection from "./PoolConnection";

export default class MessageRepositoryPostgres implements MessageRepository {

    private database: string = String(process.env.DB_NAME);
    
    async create(message: Message): Promise<void> {
        const connection = await PoolConnection.getInstance();
        const query = `INSERT INTO ${this.database}.messages(id, sender_id, recipient_id, message, send_at) VALUES($1, $2, $3, $4, $5)`;
        const values = [message.id, message.sender.id, message.recipient.id, message.text, message.time];
        await connection.query(query, values);
    }

    async findBySender(user: User): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }

    async findByRecipient(user: User): Promise<Message[]> {
        const connection = await PoolConnection.getInstance();
        const query = `SELECT 
            m.id AS message_id,
            m.message,
            m.send_at,
            m.status,
            m.created_at AS message_created_at,
            
            sender.id AS sender_id,
            sender.name AS sender_name,
            sender.email AS sender_email,
            
            recipient.id AS recipient_id,
            recipient.name AS recipient_name,
            recipient.email AS recipient_email

        FROM bee_database.messages m
        JOIN bee_database.users sender ON m.sender_id = sender.id
        JOIN bee_database.users recipient ON m.recipient_id = recipient.id
        WHERE recipient_id = $1
        ORDER BY m.send_at DESC;`;
        const values = [user.id];
        const result = await connection.query(query, values);

        const messages = result.rows.map((message) => {
            const sender = new User(message.sender_name, message.sender_email, message.sender_id);
            const recipient = new User(message.recipient_name, message.recipient_email, message.recipient_id);
            return new Message(message.message, new Date(message.send_at), sender, recipient, message.message_id, message.status);
        })
        
        return messages;
    }    

    async updateStatus(message: Message): Promise<void> {
        const connection = await PoolConnection.getInstance();
        const query = `UPDATE ${this.database}.messages SET status = $1 where id = $2`;
        const values = [message.status, message.id];
        await connection.query(query, values);        
    }

}