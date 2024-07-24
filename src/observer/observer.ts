import { hasProto, isArray, isObject, noop } from '@type-dom/utils';
import { IJsonData, IObData } from '../interface';

import { def } from '../util/lang';
import { arrayMethods } from './array';
import { observe } from './observe';
import { Dep } from './dep';
import { defineReactive } from './defineReactive';
import { NO_INITIAL_VALUE } from './util';

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// ssr mock dep
const mockDep = {
  subs: [],
  notify: noop,
  depend: noop,
  addSub: noop,
  removeSub: noop,
} as unknown as Dep;

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(public target: IObData, shallow = false, mock = false) {
    console.error('Observer . ');
    // this.value = value
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(target, '__ob__', this);
    if (isArray(target)) {
      if (!mock) {
        if (hasProto) {
          /* eslint-disable no-proto */
          (target as any).__proto__ = arrayMethods;
          /* eslint-enable no-proto */
        } else {
          for (let i = 0, l = arrayKeys.length; i < l; i++) {
            const key = arrayKeys[i];
            def(target, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(target);
      }
    } else {
      /**
       * Walk through all properties and convert them into
       * getter/setters. This method should only be called when
       * value type is Object.
       */
      const keys = Object.keys(target);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        defineReactive(target, key, NO_INITIAL_VALUE, undefined, shallow, mock);
      }
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(value: IObData[]) {
    for (let i = 0, l = value.length; i < l; i++) {
      if (isObject(value[i])) {
        observe(value[i] /* false, this.mock*/);
      }
    }
  }
}
