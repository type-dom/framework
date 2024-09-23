import { IDeque } from './deque.interface';

export class Deque<T> implements IDeque<T> {
  private items: T[] = [];

  // 检查双端队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 向队尾添加元素
  addRear(item: T): void {
    this.items.push(item);
  }

  // 向队首添加元素
  addFront(item: T): void {
    this.items.unshift(item);
  }

  // 从队尾移除并返回元素
  removeRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // 从队首移除并返回元素
  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // 查看队尾元素
  peekRear(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // 查看队首元素
  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // 获取双端队列的大小
  size(): number {
    return this.items.length;
  }

  // 清空双端队列
  clear(): void {
    this.items = [];
  }

  // 返回双端队列的所有元素
  toArray(): T[] {
    return [...this.items];
  }

  // 打印双端队列的内容
  print(): void {
    console.log(this.toArray());
  }
}
