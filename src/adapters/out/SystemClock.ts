import { Clock } from "../../ports/outbound/Clock";

export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
