import { watch } from './watch'; // 请确保这里的路径指向实际的模块位置

class TestClass {
  @watch
  nested: { value: number } = { value: 10 };

  @watch
  simpleValue = 5;
}

describe('@Watch decorator', () => {
  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  it('should create a proxy for the decorated property', () => {
    // 检查testInstance.nested是否被转换为Proxy实例
    expect(testInstance.nested).toBeInstanceOf(Proxy);

    // 检查testInstance.nested.value是否仍然可以访问原始值
    expect(testInstance.nested.value).toBe(10);

    // 修改值并验证是否触发了console.log
    const consoleSpy = jest.spyOn(console, 'log');
    testInstance.nested.value = 20;
    expect(consoleSpy).toHaveBeenCalledWith(`Property nested.value changed from 10 to 20`);
  });

  it('should handle simple values', () => {
    // 检查testInstance.simpleValue是否被转换为Proxy实例
    expect(testInstance.simpleValue).toBeInstanceOf(Proxy);

    // 修改值并验证是否触发了console.log
    const consoleSpy = jest.spyOn(console, 'log');
    testInstance.simpleValue = 15;
    expect(consoleSpy).toHaveBeenCalledWith(`Property simpleValue changed from 5 to 15`);
  });

  it('should handle nested objects recursively', () => {
    class DeepTestClass {
      @watch
      nested: { deeper: { value: number } } = { deeper: { value: 10 }};
      // todo
      @watch
      nestedObject = {
        a: 1,
        b: {
          c: 2
        }
      };
    }
// 测试属性变化
//     instance.nestedObject.a = 10; // 输出: Property nestedObject.a changed from 1 to 10
//     instance.nestedObject.b.c = 20; // 输出: Property nestedObject.b.c changed from 2 to 20

    const deepTestInstance = new DeepTestClass();

    // 修改嵌套值并验证是否触发了console.log
    const consoleSpy = jest.spyOn(console, 'log');
    deepTestInstance.nested.deeper.value = 20;
    expect(consoleSpy).toHaveBeenCalledWith(`Property nested.deeper.value changed from 10 to 20`);
  });
});
