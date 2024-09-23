import { Deque } from './deque.class';

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  it('should create an empty deque', () => {
    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
  });

  it('should add elements to the rear and front', () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.addFront(0);

    expect(deque.toArray()).toEqual([0, 1, 2]);
  });

  it('should remove elements from the rear and front', () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.addRear(3);

    expect(deque.removeFront()).toBe(1);
    expect(deque.removeRear()).toBe(3);
    expect(deque.toArray()).toEqual([2]);
  });

  it('should return undefined when removing from an empty deque', () => {
    expect(deque.removeFront()).toBe(undefined);
    expect(deque.removeRear()).toBe(undefined);
  });

  it('should peek at the rear and front without removing', () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.addFront(0);

    expect(deque.peekFront()).toBe(0);
    expect(deque.peekRear()).toBe(2);
  });

  it('should return undefined when peeking an empty deque', () => {
    expect(deque.peekFront()).toBe(undefined);
    expect(deque.peekRear()).toBe(undefined);
  });

  it('should clear the deque', () => {
    deque.addRear(1);
    deque.addRear(2);
    deque.clear();

    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
  });
});
