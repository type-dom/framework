
import { Dep } from '../dep/dep.class';
import { IJsonData, IJsonDataProp } from '../../interface';

export class Observer {
  private value: IJsonData;
  constructor(value: IJsonData) {
    this.value = value;
    this.walk(value);
  }

  walk(obj: IJsonData) {
    Object.keys(obj).forEach(key => {
      this.convert(key, obj[key]);
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        new Observer(obj[key] as IJsonData);
      }
    });
  }

  convert(key: string | number, value: IJsonDataProp) {
    const that = this;
    let dep = new Dep();

    Object.defineProperty(this.value, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.warn('get . value is ', value, ' key is ', key, ' dep is ', dep);
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set(newVal) {
        // console.warn('set . newVal is ', newVal, ' value is ', value);
        if (newVal === value) return;
        value = newVal;
        dep.notify();
        if (typeof value === 'object') {
          that.walk(value as IJsonData);
        }
      }
    });
  }
}
