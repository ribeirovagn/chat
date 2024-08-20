import amqplib, { Channel, Connection } from "amqplib";
import "dotenv/config";

export default class RabbitMQConnection {

    private static instance: RabbitMQConnection;
    static connection: Connection;
    static channel: Channel;

    private constructor() { }

    public static async getInstance(): Promise<RabbitMQConnection> {

        if (!RabbitMQConnection.instance) {

            try {

                RabbitMQConnection.instance = new RabbitMQConnection();
                RabbitMQConnection.connection = await amqplib.connect({
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
                RabbitMQConnection.channel = await RabbitMQConnection.connection.createChannel();
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

        return RabbitMQConnection.instance;

    }

    public static async getConnection(): Promise<Connection | undefined> {
        if (!RabbitMQConnection.instance || !RabbitMQConnection.connection) {
            await this.getInstance();
        }

        return this.connection;
    }

    public static async getChannel() {
        if (!RabbitMQConnection.instance || !RabbitMQConnection.channel) {
            await this.getInstance();
        }
        return this.channel;
    }

    public static async close() {
        try {

            if (this.channel) {
                await this.channel?.close();
            }
            if (this.connection) {
                await this.connection?.close();
            }

        } catch (e: any) {
            console.error(e.message)
        }
    }
}