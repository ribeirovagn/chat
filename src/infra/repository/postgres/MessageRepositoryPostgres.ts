import MessageRepository from "../../../application/repositories/MessageRepository";
import Message from "../../../domain/entities/Message";
import User from "../../../domain/entities/User";
import PoolConnection from "./PoolConnection";

export default class MessageRepositoryPostgres implements MessageRepository {

    private database: string = String(process.env.DB_NAME);
    
    async create(message: Message): Promise<void> {
        const connection = await PoolConnection.getInstance();
        const query = `INSERT INTO ${this.database}.messages(id, sender, recipient, message, send_at) VALUES($1, $2, $3, $4, $5)`;
        const values = [message.id, message.sender.id, message.recipient.id, message.text, message.time];
        await connection.query(query, values);
    }

    async findBySender(user: User): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }

    async findByRecipient(user: User): Promise<Message[]> {
        const connection = await PoolConnection.getInstance();
        const query = `SELECT * FROM ${this.database}.messages WHERE receipt_id = $1`;
        const values = [user.id];
        const result = await connection.query(query, values);

        console.log(result);

        const messages = [];
        result.rows.map((message) => {
            // const sender = new User(message);
            // const msg = new Message(message.text, new Date(message.time), )
        })
    }    

    async updateStatus(message: Message): Promise<void> {
        const connection = await PoolConnection.getInstance();
        const query = `UPDATE ${this.database}.messages SET status = $1 where id = $2`;
        const values = [message.status, message.id];
        await connection.query(query, values);        
    }

}