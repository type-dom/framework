import { Effect } from './effect';
import { reactive } from './reactive';

type ComputedGetter<T> = () => T;
type ComputedSetter<T> = (v: T) => void;

interface WritableComputedOptions<T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<T>;
}

export function computed<T>(getter: ComputedGetter<T>): { value: T };
export function computed<T>(options: WritableComputedOptions<T>): { value: T };
export function computed<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>): { value: T } {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;

  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions;
    setter = () => {
      console.warn('Write operation failed: computed value is readonly');
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  const effect = new Effect(getter);

  return {
    get value() {
      return effect.run();
    },
    set value(newValue) {
      setter(newValue);
    }
  };
}

// 示例使用
// const state = reactive({ count: 0 });
//
// const doubleCount = computed(() => state.count * 2);
//
// console.log(doubleCount.value); // 0
// state.count = 5;
// console.log(doubleCount.value); // 10
