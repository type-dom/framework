import { isObject } from '@type-dom/utils';
import { warn } from './warning';
import { currentInstance } from './component';

/**
 * 暴露给外部的属性
 * 最好减少使用， 直接this.prop 赋值就行。
 * @param exposed
 */
export function defineExpose<T>(exposed: T): void {
  if (currentInstance) {
    if (isObject(exposed)) {
      for (const key in exposed) {
        Object.defineProperty(currentInstance, key, {
          value: exposed[key as keyof T],
          configurable: true,
        })
      }
    }
  } else {
    warn(`provide() can only be used inside setup().`)
  }
}
