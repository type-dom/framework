import { Stack } from '../../../src/structure/stack/stack.class';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should create an empty stack', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.toArray()).toEqual([]);
  });

  it('should push elements onto the stack', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(1);
    expect(stack.toArray()).toEqual([1]);

    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.toArray()).toEqual([1, 2]);
  });

  it('should pop elements from the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.toArray()).toEqual([1]);

    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
    expect(stack.toArray()).toEqual([]);
  });

  it('should return undefined when popping from an empty stack', () => {
    expect(stack.pop()).toBe(undefined);
  });

  it('should return the top element without removing it', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
    expect(stack.toArray()).toEqual([1, 2]);
  });

  it('should return undefined when peeking an empty stack', () => {
    expect(stack.peek()).toBe(undefined);
  });

  it('should clear the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.toArray()).toEqual([]);
  });

  it('should return a copy of the stack array', () => {
    stack.push(1);
    stack.push(2);
    const arr = stack.toArray();
    expect(arr).toEqual([1, 2]);
    // Modifying the returned array should not affect the stack
    arr[0] = 10;
    expect(stack.toArray()).toEqual([1, 2]);
  });

  it('should print the stack', () => {
    stack.push(1);
    stack.push(2);
    const spy = vi.spyOn(console, 'log');
    stack.print();
    expect(spy).toHaveBeenCalledWith([1, 2]);
    spy.mockRestore();
  });
});
