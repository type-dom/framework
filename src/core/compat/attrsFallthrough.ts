import { isOn } from '@type-dom/utils'
import {TypeNode} from "../abstracts/type-node/type-node.abstract";
// import type { ComponentInternalInstance } from '../component'
import { DeprecationTypes, isCompatEnabled } from './compatConfig'

export function shouldSkipAttr(
  key: string,
  instance: TypeNode,
): boolean {
  if (key === 'is') {
    return true
  }
  if (
    (key === 'class' || key === 'style') &&
    isCompatEnabled(DeprecationTypes.INSTANCE_ATTRS_CLASS_STYLE, instance)
  ) {
    return true
  }
  if (
    isOn(key) &&
    isCompatEnabled(DeprecationTypes.INSTANCE_LISTENERS, instance)
  ) {
    return true
  }
  // vue-router
  if (key.startsWith('routerView') || key === 'registerRouteInstance') {
    return true
  }
  return false
}
