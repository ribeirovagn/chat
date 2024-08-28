import IdGenerator from "../helper/idGenerator";
import User from "./User";

export default class Message {

    

    constructor(readonly text: string, readonly time: Date, readonly sender: User, readonly recipient: User,  readonly id?: string, readonly status: number = 0) {
        if(!this.id) {
            this.id = IdGenerator.gen();
        }
    }

    static create(text: string, time: number, sender: User, recipient: User) {
        return new Message(text, new Date(time), sender, recipient);
    }

}