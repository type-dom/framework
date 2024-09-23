import { IStack } from './stack.interface';

export class Stack<T> implements IStack<T> {
  private items: T[] = [];

  // 检查栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 向栈顶添加元素
  push(item: T): void {
    this.items.push(item);
  }

  // 移除并返回栈顶元素
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // 查看栈顶元素
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // 获取栈的大小
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
  }

  // 返回栈的所有元素
  toArray(): T[] {
    return [...this.items];
  }

  // 打印栈的内容
  print(): void {
    console.log(this.toArray());
  }
}
