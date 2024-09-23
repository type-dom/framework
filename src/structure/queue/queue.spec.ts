import { Queue } from './queue.class';

describe('Queue', () => {
  it('should create an empty queue', () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it('should enqueue and dequeue elements correctly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should return undefined when dequeuing from an empty queue', () => {
    const queue = new Queue<number>();
    expect(queue.dequeue()).toBe(undefined);
  });

  it('should return the front and back elements correctly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.front()).toBe(1);
    expect(queue.back()).toBe(2);
  });

  it('should return undefined for front and back on an empty queue', () => {
    const queue = new Queue<number>();
    expect(queue.front()).toBe(undefined);
    expect(queue.back()).toBe(undefined);
  });

  it('should return the correct size of the queue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });

  it('should clear the queue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it('should return an array representation of the queue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.toArray()).toEqual([1, 2]);
  });
});
