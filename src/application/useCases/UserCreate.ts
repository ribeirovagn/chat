import User from "../../domain/entities/User";
import UserRepository from "../repositories/UserRepository";

export default class UserCreate {
    constructor(readonly userRepository: UserRepository) {}

    async execute(input: Input): Promise<User> {
        const user = new User(input.name, input.email, input.id);
        await this.userRepository.create(user);
        return user;
    }

}


type Input = {
    name: string,
    email: string,
    id?: string
}