import UserRepository from "../../../application/repositories/UserRepository";
import User from "../../../domain/entities/User";
import PoolConnection from "./PoolConnection";

export default class UserRepositoryPostgres implements UserRepository {
    
  private database: string = String(process.env.DB_NAME);

  constructor() {}

  async create(user: User): Promise<void> {
    const connection = await PoolConnection.getInstance();
    const query = `INSERT INTO ${this.database}.users(id, name, email) VALUES($1, $2, $3)`;
    const values = [user.id, user.name, user.email];
    await connection.query(query, values);
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
}
