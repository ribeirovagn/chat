import crypto from "crypto";

export default class IdGenerator {
  static gen(): string {
    return crypto.randomUUID();
  }
}
