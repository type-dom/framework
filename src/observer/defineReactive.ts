import { hasChanged, isArray, isObject } from '@type-dom/utils';
import { Dep } from './dep';
import { observe } from './observe';
import { isRef, NO_INITIAL_VALUE } from './util';
import { dependArray } from './dependArray';

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(
  obj: object,
  key: string,
  val?: any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  customSetter?: Function | null,
  shallow?: boolean,
  mock?: boolean,
  observeEvenIfShallow = false
) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if (
    (!getter || setter) &&
    (val === NO_INITIAL_VALUE || arguments.length === 2)
  ) {
    // @ts-ignore
    val = obj[key];
  }

  let childOb = shallow
    ? val && val.__ob__
    : isObject(val)
    ? observe(val, false, mock)
    : val;

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      console.log('reactiveGetter value is ', value);
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        // #7981: for accessor properties without setter
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = shallow
        ? newVal && newVal.__ob__
        : observe(newVal, false, mock);
      dep.notify();
    },
  });
  return dep;
}
