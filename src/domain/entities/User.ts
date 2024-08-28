import IdGenerator from "../helper/idGenerator";

export default class User {

    constructor(readonly name:string, readonly email:string, readonly id?: string) {
        if(this.id === undefined){
            this.id = IdGenerator.gen();
        }
    }
}
