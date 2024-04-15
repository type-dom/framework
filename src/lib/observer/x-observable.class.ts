import { BehaviorSubject } from 'rxjs';
import { IJsonData } from '../../interface';
import { XProxy } from './x-proxy/x-proxy.class';


export class XObservable<T extends IJsonData> {
  _subject: BehaviorSubject<T>;
  _data: XProxy<T>;

  constructor(data: T) {
    this._subject = new BehaviorSubject<T>(data);
    this._data = new XProxy<T>(data, {
      set: (target, key, value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

  setDataItem(key: string, value: T[string]) {
    this._data.set(key, value);
  }
  next(data: T) {
    this._subject.next(data);
  }
}
