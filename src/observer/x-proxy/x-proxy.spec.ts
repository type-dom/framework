import { XProxy } from './x-proxy.class';

describe('x-proxy', () => {
  it('should work', () => {
    // 使用示例
    const obj = { a: 1, b: { c: 2 } };
    const proxy = new XProxy<typeof obj>(obj);
    console.log(proxy._target.b.c);
    console.log(proxy.b.c);
    proxy.b = new XProxy({ d: 3 }); // 设置嵌套对象
    // console.log(proxy.get('b').get('d'));  // 输出：3
    proxy.set('a', 4); // 设置属性
    console.log(proxy.get('a')); // 输出：4
    expect(proxy.get('a')).toEqual(4);
  });
});

describe('c', () => {
  it('should work ', () => {
    // 使用示例
    const originalObj: Record<string, string | number> = {
      name: 'John Doe',
      age: 30
    } as const;

    const interceptedObj = new XProxy<typeof originalObj>(originalObj);

    console.log(interceptedObj.name); // 输出 "Get operation: name"，然后输出 "John Doe"
    interceptedObj.name = 'Jane Doe'; // 输出 "Set operation: name to Jane Doe"

    // 模拟 delete 操作
    interceptedObj.deleteProperty('name'); // 输出 "Delete operation: name"

    // 模拟枚举操作
    console.log(interceptedObj.ownKeys()); // 输出 "Enumerate keys operation"，然后输出 ["age"]

    // 添加新属性并触发拦截
    interceptedObj.setNewProperty('city', 'New York');

    console.log('interceptedObj.city is ', interceptedObj.city); // 输出 "Get operation: city"，然后输出 "New York"

    expect(interceptedObj.city).toEqual('New York');
  });
});

describe('test3', () => {
  it('should work . ', () => {
    const person = {
      name: 'Alice',
      age: 30
    };
    const proxy = new XProxy(person);
    proxy.name = 'Jane';
    proxy.age = 45;
    proxy.mother = 'Hellen';
    // proxy.parent.father = 'Jeff'; // parent 为空
    expect(proxy.name).toEqual('Jane');
    expect(proxy.age).toEqual(45);
  });
});
