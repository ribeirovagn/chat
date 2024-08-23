import IdGenerator from "../helper/idGenerator";

export default class User {

    readonly id: string;

    constructor(readonly name:string, readonly email:string, id: string = "") {
        if(id === ""){
            this.id = IdGenerator.gen();
        } else {
            this.id = id;
        }
    }
}
