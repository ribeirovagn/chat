import User from "../../domain/entities/User";

export default interface UserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
}