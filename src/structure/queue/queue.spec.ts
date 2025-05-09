import { Queue } from './queue.class'; // Update with the correct path to your Queue implementation

describe('Queue', () => {
  it('should create an instance of Queue', () => {
    const queue = new Queue();
    expect(queue).toBeInstanceOf(Queue);
  });

  it('should start the queue when autostart is true', () => {
    const mockWorker = vi.fn();
    const queue = new Queue({ autostart: true });
    queue.push(mockWorker);
    // Assuming _start() sets running to true
    expect(queue.running).toBe(true);
  });

  it('should add a job to the queue and call it when started', async () => {
    const mockWorker = vi.fn().mockResolvedValue(console.log);
    const queue = new Queue({ autostart: false });
    queue.push(mockWorker);
    await queue.start();
    expect(mockWorker).toHaveBeenCalled();
  });

  it('should handle errors when a job fails', (done) => {
    const mockWorker = vi.fn().mockRejectedValue(new Error('Test error'));
    const queue = new Queue({ autostart: true });
    queue.push(mockWorker);
    queue.addEventListener('error', (event) => {
      expect(event.detail.error).toBeInstanceOf(Error);
      expect(event.detail.error.message).toBe('Test error');
      // done();
    });
  });

  // Add more test-dts here to cover different aspects of the Queue functionality
});
