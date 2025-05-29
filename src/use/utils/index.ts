import { getCurrentInstance } from '../../core/instance'

export * from './filters'
export * from './general'
export * from './is'
export * from './port'
export * from './types'

export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance()
}
