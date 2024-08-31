import "dotenv/config";
import pgp from "pg-promise";


export default class PoolConnection {

  connection: any;

  constructor() {
    this.connection = pgp()(`postgres://${String(process.env.DB_USER)}:${String(process.env.DB_PASS)}@${String(process.env.DB_HOST)}:${String(process.env.DB_PORT)}/${String(process.env.DB_NAME)}`);
  }

  query(statement: string, params: any) : Promise<any>{
    return this.connection.query(statement, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }

}
