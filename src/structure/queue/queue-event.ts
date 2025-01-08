import { EventsMap } from './queue.interface';

/**
 * Since CustomEvent is only supported in nodejs since version 19,
 * you have to create your own class instead of using CustomEvent
 * @see https://github.com/nodejs/node/issues/40678
 * */
export class QueueEvent<Name extends keyof EventsMap, Detail extends EventsMap[Name]> extends Event {
  readonly detail: Detail;

  constructor(name: Name, detail: Detail) {
    super(name);
    this.detail = detail;
  }
}
