import { IQueue } from './queue.interface';
export class Queue<T> implements IQueue<T> {
  private items: T[] = [];

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 向队尾添加元素
  enqueue(item: T): void {
    this.items.push(item);
  }

  // 从队头移除并返回元素
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // 查看队头元素
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // 查看队尾元素
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // 获取队列的大小
  size(): number {
    return this.items.length;
  }

  // 清空队列
  clear(): void {
    this.items = [];
  }

  // 返回队列的所有元素
  toArray(): T[] {
    return [...this.items];
  }

  // 打印队列的内容
  print(): void {
    console.log(this.toArray());
  }
}
