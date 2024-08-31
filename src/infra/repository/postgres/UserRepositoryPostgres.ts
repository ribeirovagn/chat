import UserRepository from "../../../application/repositories/UserRepository";
import User from "../../../domain/entities/User";
import PoolConnection from "./PoolConnection";

export default class UserRepositoryPostgres implements UserRepository {
  private database: string = String(process.env.DB_NAME);

  constructor(readonly databaseConnection: PoolConnection) {}

  async create(user: User): Promise<void> {
    try {
      const query = `INSERT INTO ${this.database}.users(id, name, email) VALUES($1, $2, $3)`;
      const values = [user.id, user.name, user.email];
      await this.databaseConnection.query(query, values);
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro: ${error.message}`);
      } else {
        throw new Error("Ocorreu um erro desconhecido.");
      }
    }
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
}
