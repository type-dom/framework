export interface IDeque<T> {
  // 检查双端队列是否为空
  isEmpty(): boolean;

  // 向队尾添加元素
  addRear(item: T): void;

  // 向队首添加元素
  addFront(item: T): void;

  // 从队尾移除并返回元素
  removeRear(): T | undefined;

  // 从队首移除并返回元素
  removeFront(): T | undefined;

  // 查看队尾元素
  peekRear(): T | undefined;

  // 查看队首元素
  peekFront(): T | undefined;

  // 获取双端队列的大小
  size(): number;

  // 清空双端队列
  clear(): void;

  // 返回双端队列的所有元素
  toArray(): T[];

  // 打印双端队列的内容
  print(): void;
}
