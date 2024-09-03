import amqplib, { Channel, Connection } from "amqplib";
import "dotenv/config";

export default class RabbitMQConnection {

    private static instance: RabbitMQConnection;
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    private constructor() { }

    public static getInstance(): RabbitMQConnection {

        if (!RabbitMQConnection.instance) {
            try {
                RabbitMQConnection.instance = new RabbitMQConnection();
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

        return RabbitMQConnection.instance;

    }

    async getConnection(): Promise<Connection> {
        if (!this.connection) {
            this.connection = await amqplib.connect({
                protocol: process.env.RABBIT_MQ_PROTOCOL,
                hostname: process.env.RABBIT_MQ_HOST,
                port: Number(process.env.RABBIT_MQ_PORT),
                username: process.env.RABBIT_MQ_USER,
                password: process.env.RABBIT_MQ_PASS,
                locale: process.env.RABBIT_MQ_LOCALE,
                frameMax: Number(process.env.RABBIT_MQ_FRAME_MAX),
                heartbeat: Number(process.env.RABBIT_MQ_HEART_BEAT),
                vhost: process.env.RABBIT_MQ_VHOST
            });
        }

        return this.connection;
    }

    async getChannel() : Promise<Channel >{
        if (this.connection) {
            return await this.connection.createChannel();
        }
        
        await this.getConnection();
        return await this.connection!.createChannel();
    }

    async close() {
        try {
            if (this.connection) {
                await this.connection?.close();
                this.connection = null;
            }
        } catch (e: any) {
            console.error(e.message)
        }
    }
}