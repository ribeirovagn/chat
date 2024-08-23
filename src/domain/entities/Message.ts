import IdGenerator from "../helper/idGenerator";
import User from "./User";

export default class Message {

    constructor(readonly text: string, readonly time: Date, readonly sender: User, readonly recipient: User,  readonly id?: string) {
        if(!this.id) {
            this.id = IdGenerator.gen();
        }
    }

    static create(text: string, time: number, _from: any, _subject: any) {
        const from = new User(_from.name, _from.email);
        const subject = new User(_subject.name, _subject.email);
        return new Message(text, new Date(time), from, subject);
    }

}