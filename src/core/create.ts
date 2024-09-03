import { Div } from '../components/html-element/div/div.class';
import { TypeNode } from './type-node/type-node.abstract';
import { ITypeConfig } from './type-node/type-node.interface';

// 定义一个泛型辅助类型，用于描述构造函数参数的类型
// type ConstructorArgs<T> = T extends new (args: infer P) => any ? P : never;
// type ConstructorArg<P extends ITypeConfig> = P;
// 定义一个泛型辅助类型，用于描述构造函数的参数

// type Constructor<T extends TypeNode, P extends ITypeConfig> = new (arg: P) => T;

export function create<T extends TypeNode, P extends ITypeConfig>(
  constructor: new (arg?: P) => T,
  arg?: P
): T {
  return new constructor(arg);
}

async function measure() {
  performance.mark('start');
// 获取创建大对象前后的内存使用情况
  const before = await (performance as any).memory.usedJSHeapSize;
// 执行你的代码，其中可能会包含变量的分配和释放
// ...
// 创建一个大的对象
  const div = create(Div, {
    name: 'div',
  });
  console.log('div is ', div);
  // (performance as any).measureUserAgentSpecificMemory(div).then((bytes: any) => {
  //   console.log('bytes is ', bytes);
  // });
// const objectAsString = JSON.stringify(div);
// console.log('objectAsString is ', objectAsString.length);
  const after = await (performance as any).memory.usedJSHeapSize;

// 计算两次内存使用的差异来估算大对象的内存使用
  const largeObjectMemory = (after - before) / 1024; // 转换为KB
  performance.mark('end');

  // const measure = performance.measure('div', 'start', 'end');
  // console.log(measure);
  console.log(`大对象大约占用内存：${largeObjectMemory} KB`);
// 清除存储的标志位
  performance.clearMarks();
  performance.clearMeasures();
}

measure();
