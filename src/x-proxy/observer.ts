export class Observer {
  private observers: Set<(newValue: any) => void> = new Set();

  constructor(private value: any) {}

  addObserver(observer: (newValue: any) => void): void {
    this.observers.add(observer);
  }

  removeObserver(observer: (newValue: any) => void): void {
    this.observers.delete(observer);
  }

  notify(newValue: any): void {
    this.observers.forEach(observer => observer(newValue));
  }
}
