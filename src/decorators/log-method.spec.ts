import { logMethod } from './log-method'; // 假设文件名为 logMethod.ts
import { expect } from '@jest/globals';

describe('logMethod', () => {
  class TestClass {
    @logMethod
    public testMethod(arg1: string, arg2: number): string {
      return `Result: ${arg1} ${arg2}`;
    }
  }

  it('should log method call and return the correct result', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const instance = new TestClass();
    const result = instance.testMethod('test', 123);

    expect(result).toBe('Result: test 123');
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Calling method testMethod with arguments ["test",123]'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('Finished calling method testMethod');

    consoleLogSpy.mockRestore();
  });

  it('should handle different types of arguments correctly', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const instance = new TestClass();
    const result = instance.testMethod('anotherTest', 456);

    expect(result).toBe('Result: anotherTest 456');
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Calling method testMethod with arguments ["anotherTest",456]'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('Finished calling method testMethod');

    consoleLogSpy.mockRestore();
  });
});


// class MyClass1 {
//   @logMethod
//   public myMethod(arg: string): string {
//     return arg.toUpperCase();
//   }
// }
//
// const instance1 = new MyClass1();
// instance1.myMethod('hello'); // 输出 "Calling method myMethod with arguments [\"hello\"]" 和 "Finished calling method myMethod"
