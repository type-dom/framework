import { logProperty } from './log-property';
describe('logProperty', () => {
  let originalConsoleLog: any;
  let logOutput: string[] = [];

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = (message: string) => {
      logOutput.push(message);
    };
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    logOutput = [];
  });

  it('should log when getting a property', () => {
    class TestClass {
      @logProperty
      public testProperty: string = 'initialValue';
    }

    const instance = new TestClass();
    const value = instance.testProperty;

    expect(value).toBe('initialValue');
    expect(logOutput).toContain('Getting value of testProperty: initialValue');
  });

  it('should log when setting a property', () => {
    class TestClass {
      @logProperty
      public testProperty: string = 'initialValue';
    }

    const instance = new TestClass();
    instance.testProperty = 'newValue';

    expect(instance.testProperty).toBe('newValue');
    expect(logOutput).toContain('Setting value of testProperty to newValue');
  });

  it('should handle initial value correctly', () => {
    class TestClass {
      @logProperty
      public testProperty: string = 'initialValue';
    }

    const instance = new TestClass();

    expect(instance.testProperty).toBe('initialValue');
  });

  it('should update property value correctly', () => {
    class TestClass {
      @logProperty
      public testProperty: string = 'initialValue';
    }

    const instance = new TestClass();
    instance.testProperty = 'updatedValue';

    expect(instance.testProperty).toBe('updatedValue');
  });
});

// class MyClass {
//   @logProperty
//   myProperty = 'initial value';
//
//   constructor() {
//     console.log(`Initial value of myProperty: ${this.myProperty}`);
//   }
// }
//
// const instance = new MyClass();
// instance.myProperty = 'new value'; // 输出 "Setting value of myProperty to new value"
// console.log(instance.myProperty);   // 输出 "Getting value of myProperty: new value" 和 "new value"
