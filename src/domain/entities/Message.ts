import User from "./User";

export default class Message {

    constructor(readonly text: string, readonly time: Date, readonly sender: User, readonly recipient: User) {
        
    }

    static create(text: string, time: number, _from: any, _subject: any) {
        const from = new User(_from.name, _from.email);
        const subject = new User(_subject.name, _subject.email);
        return new Message(text, new Date(time), from, subject);
    }

}