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
