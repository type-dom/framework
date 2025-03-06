import { isFunction } from '@type-dom/utils';
import { InjectionKey } from '../apiInject';
import { TypeNode } from './type-node.abstract';

export function useInject<T>(
  node: TypeNode,
  key: InjectionKey<T> | string,
  defaultValue?: T,
  treatDefaultAsFactory = false) {
  if (node.upProvides) { // 上一级 有 provides 的组件；
    if (node.upProvides[key]) {
      return node.upProvides[key] as T;
    } else { // 多级 存在 provides 的情况，需要递归查找。
      const context = node.parent?.inject(key, defaultValue, treatDefaultAsFactory);
      if (context) {
        return context as T;
      } else {
        return treatDefaultAsFactory && isFunction(defaultValue)
          ? defaultValue.call(node) as T
          : defaultValue;
      }
    }
  } else {
    return treatDefaultAsFactory && isFunction(defaultValue)
      ? defaultValue.call(node) as T
      : defaultValue;
  }
}
