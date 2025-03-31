import { AnyFn } from '@type-dom/utils';
import { EventsMap, Options, QueueWorker, EventListenerOrEventListenerObject } from './queue.interface';
import { QueueEvent } from './queue-event';

export class Queue extends EventTarget {

  /**
   * Max number of jobs the queue should process concurrently.
   */
  concurrency: number;

  /**
   * Milliseconds to wait for a job to execute its callback.
   */
  timeout: number;

  /**
   * Ensures the queue is always running if jobs are available.
   */
  autostart: boolean;

  /**
   * An array to set job callback arguments on.
   */
  results: any[] | null;

  private pending: number;
  private session: number;
  running: boolean;
  private jobs: QueueWorker[];
  private timers: NodeJS.Timeout[];

  constructor(options: Options = {}) {
    super();
    const { concurrency = Infinity, timeout = 0, autostart = false, results = null } = options;
    this.concurrency = concurrency;
    this.timeout = timeout;
    this.autostart = autostart;
    this.results = results;
    this.pending = 0;
    this.session = 0;
    this.running = false;
    this.jobs = [];
    this.timers = [];
    this.addEventListener('error', this._errorHandler);
  }

  /**
   * Jobs pending + jobs to process.
   */
  get length(): number {
    return this.pending + this.jobs.length;
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.jobs.length === 0;
  }

  _errorHandler(evt: QueueEvent<'error', { error: Error, job?: QueueWorker }>) {
    this.end(evt.detail.error);
  }

  /**
   * Removes the last element from the Queue and returns that element.
   */
  pop(): QueueWorker | undefined {
    return this.jobs.pop();
  }

  /**
   * 从队头移除并返回元素
   * Removes the first element from the Queue and returns that element.
   */
  shift(): QueueWorker | undefined {
    return this.jobs.shift();
  }

  /**
   * Returns the first (least) index of an element within the Queue equal to the specified value, or -1 if none is found.
   *
   * @param searchElement The value to locate in the Queue.
   * @param fromIndex The Queue index at which to begin the search. If omitted, the search starts at index 0.
   */
  indexOf(searchElement: QueueWorker, fromIndex?: number): number {
    return this.jobs.indexOf(searchElement, fromIndex);
  }

  /**
   * Returns the last (greatest) index of an element within the Queue equal to the specified value, or -1 if none is found.
   *
   * @param searchElement The value to locate in the Queue.
   * @param fromIndex The Queue index at which to begin the search. If omitted, the search starts at the last index in the Queue.
   */
  lastIndexOf(searchElement: QueueWorker, fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this.jobs.lastIndexOf(searchElement, fromIndex);
    }
    return this.jobs.lastIndexOf(searchElement);
  }

  /**
   * Extracts a section of the Queue and returns Queue.
   *
   * @param start The beginning of the specified portion of the Queue.
   * @param end The end of the specified portion of the Queue.
   */
  slice(start?: number, end?: number): Queue {
    this.jobs = this.jobs.slice(start, end);
    return this;
  }

  /**
   * Reverses the order of the elements of the Queue in place.
   */
  reverse(): Queue {
    this.jobs.reverse();
    return this;
  }

  /**
   * Adds one or more elements to the end of the Queue and returns the new length of the Queue.
   * 向队尾添加元素
   * @param workers New workers of the Queue.
   */
  push(...workers: QueueWorker[]): number {
    const methodResult = this.jobs.push(...workers);
    if (this.autostart) {
      this._start();
    }
    return methodResult;
  }

  /**
   * Adds one or more elements to the front of the Queue and returns the new length of the Queue.
   *
   * @param workers Workers to insert at the start of the Queue.
   */
  unshift(...workers: QueueWorker[]): number {
    const methodResult = this.jobs.unshift(...workers);
    if (this.autostart) {
      this._start();
    }
    return methodResult;
  }

  /**
   * Adds and/or removes elements from the queue.
   *
   * @param start The zero-based location in the Queue from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   */
  splice(start: number, deleteCount?: number): Queue;

  /**
   * Adds and/or removes elements from the queue.
   *
   * @param start The zero-based location in the Queue from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param workers Workers to insert into the Queue in place of the deleted elements.
   */
  splice(start: number, deleteCount: number, ...workers: QueueWorker[]): Queue {
    this.jobs.splice(start, deleteCount, ...workers);
    if (this.autostart) this._start();
    return this;
  }

  /**
   * Starts the queue.
   *
   * @param callback Callback to be called when the queue empties or when an error occurs.
   */
  start(): Promise<{ error?: Error, results?: any[] | null }>;

  start(): void;
  start(callback?: (error?: Error, results?: any[] | null) => void) {
    if (this.running) throw new Error('already started');
    let awaiter;
    if (callback) {
      this._addCallbackToEndEvent(callback);
    } else {
      awaiter = this._createPromiseToEndEvent();
    }
    this._start();
    return awaiter;
  }

  _start() {
    this.running = true;
    if (this.pending >= this.concurrency) {
      return;
    }
    if (this.jobs.length === 0) {
      if (this.pending === 0) {
        this.done();
      }
      return;
    }
    const job = this.jobs.shift();
    const session = this.session;
    const timeout = (job !== undefined) && has.call(job, 'timeout') ? job.timeout : this.timeout;
    let once = true;
    let timeoutId: NodeJS.Timeout | null = null;
    let didTimeout = false;
    let resultIndex: number | null = null;
    const next = (error?: Error, ...result: any[]) => {
      if (once && this.session === session) {
        once = false;
        this.pending--;
        if (timeoutId !== null) {
          this.timers = this.timers.filter(tID => tID !== timeoutId);
          clearTimeout(timeoutId);
        }
        if (error) {
          this.dispatchEvent(new QueueEvent('error', { error, job: job! }));
        } else if (!didTimeout) {
          if (resultIndex !== null && this.results !== null) {
            this.results[resultIndex] = [...result];
          }
          this.dispatchEvent(new QueueEvent('success', { result: [...result], job }));
        }
        if (this.session === session) {
          if (this.pending === 0 && this.jobs.length === 0) {
            this.done();
          } else if (this.running) {
            this._start();
          }
        }
      }
    };
    if (timeout) {
      timeoutId = setTimeout(() => {
        didTimeout = true;
        this.dispatchEvent(new QueueEvent('timeout', { next, job }));
        next();
      }, timeout);
      this.timers.push(timeoutId);
    }
    if (this.results != null) {
      resultIndex = this.results.length;
      this.results[resultIndex] = null;
    }
    this.pending++;
    this.dispatchEvent(new QueueEvent('start', { job }));
    if (job === undefined) {
      return;
    }
    job.promise = job(next);
    if (job.promise !== undefined && typeof job.promise.then === 'function') {
      job.promise.then(function(result: unknown) {
        return next(undefined, result);
      }).catch(function(err: any) {
        return next(err || true);
      });
    }
    if (this.running && this.jobs.length > 0) {
      this._start();
    }
  }

  /**
   * Stops the queue.
   */
  stop(): void {
    this.running = false;
  }

  /**
   * Stop and empty the queue immediately.
   *
   * @param error error of why the stop has occurred, to be passed to start callback if supplied.
   */
  end(error?: Error): void {
    this.clearTimers();
    this.jobs.length = 0;
    this.pending = 0;
    this.done(error);
  }

  clearTimers() {
    this.timers.forEach(timer => {
      clearTimeout(timer);
    });
    this.timers = [];
  }

  _addCallbackToEndEvent(cb: AnyFn) {
    const onend = (evt: QueueEvent<'end', any>) => {
      this.removeEventListener('end', onend);
      cb(evt.detail.error, this.results);
    };
    this.addEventListener('end', onend);
  }

  _createPromiseToEndEvent(): Promise<{ error?: Error, results?: any[] | null }> {
    return new Promise((resolve, reject) => {
      this._addCallbackToEndEvent((error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  }

  done(error?: any) {
    this.session++;
    this.running = false;
    this.dispatchEvent(new QueueEvent('end', { error }));
  }

  // 查看队头元素
  front(): QueueWorker | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.jobs[0];
  }

  // 查看队尾元素
  back(): QueueWorker | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.jobs[this.jobs.length - 1];
  }

  // 获取队列的大小
  size(): number {
    return this.jobs.length;
  }

  // 清空队列
  clear(): void {
    this.jobs = [];
  }

  // 返回队列的所有元素
  toArray(): QueueWorker[] {
    return [...this.jobs];
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  override addEventListener<Event extends keyof EventsMap>(name: Event, callback: EventListenerOrEventListenerObject<QueueEvent<Event, EventsMap[Event]>>, options?: AddEventListenerOptions | boolean): void;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  dispatchEvent<Event extends keyof EventsMap>(event: QueueEvent<Event, EventsMap[Event]>): boolean;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  removeEventListener<Event extends keyof EventsMap>(name: Event, callback: EventListenerOrEventListenerObject<QueueEvent<Event, EventsMap[Event]>>, options?: EventListenerOptions | boolean): void;

}

const has = Object.prototype.hasOwnProperty;
