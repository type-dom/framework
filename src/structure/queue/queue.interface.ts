import { QueueEvent } from './queue-event';

export interface IQueue<T> {
  // 检查队列是否为空
  isEmpty(): boolean;

  // 向队尾添加元素
  enqueue(item: T): void;

  // 从队头移除并返回元素
  dequeue(): T | undefined;

  // 查看队头元素
  front(): T | undefined;

  // 查看队尾元素
  back(): T | undefined;

  // 获取队列的大小
  size(): number;

  // 清空队列
  clear(): void;

  // 返回队列的所有元素
  toArray(): T[];

  // 打印队列的内容
  print(): void;
}

// Type definitions for Queue
// Project: https://github.com/jessetane/queue
// Definitions by: Alex Miller <https://github.com/codex->
// Additions by Maksim Lavrenyuk <https://github.com/MaksimLavrenyuk>



export type EventsMap = {
  end: { error?: Error }
  error: { error: Error, job?: QueueWorker }
  timeout: { next: (err?: Error, ...result: any[]) => void, job?: QueueWorker }
  success: { result: any[] }
  start: { job?: QueueWorker }
}


export type EventListenerOrEventListenerObject<Event extends QueueEvent<keyof EventsMap, EventsMap[keyof EventsMap]>> = (event: Event) => void | {
  handleEvent(Event: Event): void;
};


export interface Options {
  /**
   * Max number of jobs the queue should process concurrently.
   *
   * @default Infinity
   */
  concurrency?: number;

  /**
   * Milliseconds to wait for a job to execute its callback.
   *
   * @default 0
   */
  timeout?: number;

  /**
   * Ensures the queue is always running if jobs are available. Useful in situations where you are using a queue only for concurrency control.
   *
   * @default false
   */
  autostart?: boolean;

  /**
   * An array to set job callback arguments on.
   *
   * @default null
   */
  results?: any[] | null;
}

export interface QueueWorker {
  (callback?: QueueWorkerCallback): undefined | Promise<any>;

  /**
   * Override queue timeout.
   */
  timeout?: number;
  /**
   *  If the QueueWorker returns a promise, it will be moved to this field.
   *  This can be useful when tracking timeout events
   */
  promise?: Promise<any>
}

export interface QueueWorkerCallback {
  (error?: Error, data?: object): void;
}
