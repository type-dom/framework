import { BehaviorSubject } from 'rxjs';
import { XProxy } from '../x-proxy/x-proxy.class';
import { IXProxyConfig, IXProxyProp } from '../x-proxy/x-proxy.interface';

export class XObservable<T extends IXProxyConfig> {
  _subject: BehaviorSubject<T>;
  _data: XProxy<T>;

  constructor(data: T) {
    this._subject = new BehaviorSubject<T>(data);
    this._data = new XProxy<T>(data, {
      set: (target, key, value) => {
        // @ts-ignore
        target[key] = value;
        // this._subject.next(data);
        this.next(data);
        return true;
      },
    });
  }
  get data(): T {
    return this._data._target;
  }
  set data(data: T) {
    this._data._target = data;
  }
  get subject() {
    return this._subject.asObservable();
  }

  setDataItem(key: string, value: IXProxyProp) {
    this._data.set(key, value);
  }
  next(data: T) {
    this._subject.next(data);
  }
}
