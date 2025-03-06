import { logClass } from './log-class';

describe('logClass', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log the class name when the class is defined', () => {
    @logClass
    class TestClass {}

    expect(consoleSpy).toHaveBeenCalledWith('Class TestClass is being created');
  });

  it('should log the correct class name for another class', () => {
    @logClass
    class AnotherClass {}

    expect(consoleSpy).toHaveBeenCalledWith('Class AnotherClass is being created');
  });
});
