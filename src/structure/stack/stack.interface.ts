export interface IStack<T> {
  // 检查栈是否为空
  isEmpty(): boolean;

  // 向栈顶添加元素
  push(item: T): void;

  // 移除并返回栈顶元素
  pop(): T | undefined;

  // 查看栈顶元素
  peek(): T | undefined;

  // 获取栈的大小
  size(): number;

  // 清空栈
  clear(): void;

  // 返回栈的所有元素
  toArray(): T[];

  // 打印栈的内容
  print(): void;
}
