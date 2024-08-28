import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

export default class PoolConnection {
  private static instance: PoolConnection;
  private static connection: pg.PoolClient;

  private constructor() {}

  public static async getInstance(): Promise<pg.PoolClient> {
    

    PoolConnection.instance = new PoolConnection();

    const pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      max: 40,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    PoolConnection.connection = await pool.connect();
    return PoolConnection.connection;
    
  }
}
