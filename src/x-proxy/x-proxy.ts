import { Observer } from './observer';

export class XProxy<T> {
  private _value: T;
  private observer: Observer;

  constructor(initialValue: T) {
    this._value = initialValue;
    this.observer = new Observer(initialValue);
    this._value = new Proxy(initialValue, this.createHandler());
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
    this.observer.notify(newValue);
  }

  addObserver(observer: (newValue: T) => void): void {
    this.observer.addObserver(observer);
  }

  removeObserver(observer: (newValue: T) => void): void {
    this.observer.removeObserver(observer);
  }

  private createHandler(): ProxyHandler<T> {
    const self = this;
    return {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        const result = Reflect.set(target, prop, value, receiver);
        self.observer.notify(target);
        return result;
      }
    };
  }
}
