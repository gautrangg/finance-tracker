import { randomUUID } from "crypto";
import { IdGenerator } from "../../ports/outbound/IdGenerator";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
