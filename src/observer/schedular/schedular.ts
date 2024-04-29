// 简化版Vue3调度中心scheduler
class Scheduler {
  private preFlushQueue: Array<() => void>;
  private postFlushQueue: any[];
  private pendingPreFlushCbs: any[];
  constructor() {
    this.preFlushQueue = [];
    this.postFlushQueue = [];
    this.pendingPreFlushCbs = [];
  }

  schedule(job: () => void) {
    // 根据job的特性决定放入哪个队列
    // 此处仅为示例，实际Vue3调度器逻辑更复杂
    this.preFlushQueue.push(job);
  }

  flushJobs(async: boolean) {
    // 执行preFlushQueue中的任务
    while (this.preFlushQueue.length) {
      const job = this.preFlushQueue.shift();
      job && job();
    }

    // 如果有pendingPreFlushCbs，处理这些异步任务
    if (this.pendingPreFlushCbs.length) {
      Promise.resolve().then(() => {
        this.flushPreFlushCbs();
        if (async) {
          this.runPostFlushCbs();
        }
      });
    } else if (async) {
      // 异步执行postFlushQueue中的任务
      Promise.resolve().then(() => this.runPostFlushCbs());
    } else {
      // 同步执行postFlushQueue中的任务
      this.runPostFlushCbs();
    }
  }

  flushPreFlushCbs() {
    // 处理pendingPreFlushCbs中的异步任务
    // 并将产生的新任务添加到preFlushQueue
    while (this.pendingPreFlushCbs.length) {
      const job = this.pendingPreFlushCbs.shift();
      job();
    }
  }

  runPostFlushCbs() {
    // 执行postFlushQueue中的任务
    while (this.postFlushQueue.length) {
      const job = this.postFlushQueue.shift();
      job();
    }
  }
}

// 使用示例：
const scheduler = new Scheduler();

// 注册一个job
scheduler.schedule(() => console.log('Pre-flush Job'));

// 异步触发调度
Promise.resolve().then(() => scheduler.flushJobs(true));
