// Vue 3 中的简略实现思路
import { IJsonData, IJsonDataProp } from '../../interface';
import { hasChanged, hasOwn } from '../../shared/util';
import { IXProxyHandler } from '../x-proxy/x-proxy.interface';
import { XProxy } from '../x-proxy/x-proxy.class';

function reactive(target: IJsonData) {
  return createReactiveObject(target);
}
function createReactiveObject(target: IJsonData) {
  const observed = new XProxy(target, reactiveHandler);
}

const reactiveHandler: IXProxyHandler<IJsonData> = {
  get(target: IJsonData, key: string, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target: IJsonData, key: string, value: IJsonDataProp, receiver) {
    const oldValue = Reflect.get(target, key, receiver);
    if (value !== oldValue) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (!hadKey) {
        trigger(target, 'add', key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, 'set', key, value, oldValue);
      }
      return result;
    }
    return true;
  },
  deleteProperty(target: IJsonData, key: string) {
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    const result = Reflect.deleteProperty(target, key);
    if (hadKey) {
      trigger(target, 'delete', key);
    }
    return result;
  },
  // ...其他代理陷阱
};
interface IDep {
  scheduler: (...rest: string[]) => void,
  run: (...rest: string[]) => void
}

// 简化的依赖收集和触发更新
const targetMap: WeakMap<IJsonData, Map<string, Set<IDep>>>  = new WeakMap();
// let isTracking: boolean = false;
// const trackingStack = [];
function track(target: IJsonData, key: string) {
  // if (!isTracking) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  // if (!trackingStack.includes(dep)) {
  //   trackingStack.push(dep);
  //   dep.add(activeEffect);
  // }
  scheduleEffect(dep);
}

function scheduleEffect(dep: Set<IDep>) {
  // 将effect加入调度队列等待执行
}
// 简化版响应式数据变化触发
function trigger(target: IJsonData, type: string, key?: string, newValue?: IJsonDataProp, oldValue?: IJsonDataProp) {
  // 收集在此属性上注册的所有effects（副作用函数）
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects: Set<Set<IDep>> = new Set();
  if (type === 'set' || type === 'add') {
    depsMap.forEach((dep, key) => {
      // if (key === '__v_isRef' || !dep.has(activeEffect)) return;
      effects.add(dep);
    });
  } else if (type === 'delete') {
    // ...处理删除的情况
  }
  effects.forEach(effect => {
    // if (effect.scheduler) {
    //   effect.scheduler();
    // } else {
    //   effect.run();
    // }
  });
}

// 如果需要深比较，Vue3内部可能使用的是一个更复杂的实现，例如：
function hasChangedDeep(value: IJsonDataProp, oldValue: IJsonDataProp) {
  if (value instanceof Object && oldValue instanceof Object) {
    if (Array.isArray(value) !== Array.isArray(oldValue)) {
      return true;
    }
    if (Object.keys(value).length !== Object.keys(oldValue).length) {
      return true;
    }
    for (const key in value) {

      if (!hasOwn(value as IJsonData, key) ||
        !hasChangedDeep((value as IJsonData)[key], (oldValue as IJsonData)[key])) {
        return false;
      }
    }
    return true;
  }
  return hasChanged(value, oldValue);
}
