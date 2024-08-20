export default class Json {

    constructor(protected readonly value: any
    ) { }

    public isValid() {
        try {
            JSON.parse(this.value);
        } catch (e) {
            return false;
        }
        return true;
    }
}