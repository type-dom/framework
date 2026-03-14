// import { type Ref, customRef, ref } from '../../reactivity'
import { camelize, hyphenate,
  // EMPTY_OBJ, hasChanged
} from '@type-dom/utils';
// import { warn } from '../warning';
// import { getCurrentInstance } from '../component';
// import { Ref } from '../../reactivity';
// import type { DefineModelOptions, ModelRef } from '../apiSetupHelpers'
// import { NormalizedProps } from '../componentProps';
// import { computed, effect } from '@type-dom/signals';
// import { getCurrentInstance } from '../component'
// import { warn } from '../warning'
// import type { NormalizedProps } from '../componentProps'
// import { watchSyncEffect } from '../apiWatch'
//
// export function useModel<
//   M extends PropertyKey,
//   T extends Record<string, any>,
//   K extends keyof T,
//   G = T[K],
//   S = T[K],
// >(
//   props: T,
//   name: K,
//   options?: DefineModelOptions<T[K], G, S>,
// ): ModelRef<T[K], M, G, S>
// export function useModel(
//   props: Record<string, any>,
//   name: string,
//   options: DefineModelOptions = EMPTY_OBJ,
// ): Ref {
//   const i = getCurrentInstance()!
//   // if (__DEV__ && !i) {
//   //   warn(`useModel() called without active instance.`)
//   //   return ref() as any
//   // }
//
//   const camelizedName = camelize(name)
//   // if (__DEV__ && !(i.propsOptions[0] as NormalizedProps)[camelizedName]) {
//   //   warn(`useModel() called with prop "${name}" which is not declared.`)
//   //   return ref() as any
//   // }
//
//   const hyphenatedName = hyphenate(name)
//   const modifiers = getModelModifiers(props, camelizedName)
//
//   // const res = customRef((track, trigger) => {
//   const res = (() => ((track: any, trigger: any) => {
//     let localValue: any
//     let prevSetValue: any = EMPTY_OBJ
//     let prevEmittedValue: any
//
//     // watchSyncEffect(() => {
//     effect(() => {
//       const propValue = props[camelizedName]
//       if (hasChanged(localValue, propValue)) {
//         localValue = propValue
//         trigger()
//       }
//     })
//
//     return {
//       get() {
//         track()
//         return options.get ? options.get(localValue) : localValue
//       },
//
//       set(value: any) {
//         const emittedValue = options.set ? options.set(value) : value
//         if (
//           !hasChanged(emittedValue, localValue) &&
//           !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))
//         ) {
//           return
//         }
//         const rawProps = i.props
//         if (
//           !(
//             rawProps &&
//             // check if parent has passed v-model
//             (name in rawProps ||
//               camelizedName in rawProps ||
//               hyphenatedName in rawProps) &&
//             (`onUpdate:${name}` in rawProps ||
//               `onUpdate:${camelizedName}` in rawProps ||
//               `onUpdate:${hyphenatedName}` in rawProps)
//           )
//         ) {
//           // no v-model, local update
//           localValue = value
//           trigger()
//         }
//
//         i.emit(`update:${name}`, emittedValue)
//         // #10279: if the local value is converted via a setter but the value
//         // emitted to parent was the same, the parent will not trigger any
//         // updates and there will be no prop sync. However the local input state
//         // may be out of sync, so we need to force an update here.
//         if (
//           hasChanged(value, emittedValue) &&
//           hasChanged(value, prevSetValue) &&
//           !hasChanged(emittedValue, prevEmittedValue)
//         ) {
//           trigger()
//         }
//         prevSetValue = value
//         prevEmittedValue = emittedValue
//       },
//     }
//   }))();
//
//   res[Symbol.iterator] = () => {
//     let i = 0
//     return {
//       next() {
//         if (i < 2) {
//           return { value: i++ ? modifiers || EMPTY_OBJ : res, done: false }
//         } else {
//           return { done: true }
//         }
//       },
//     }
//   }
//
//   return res
// }
/**
 * 获取指定模型名称的修饰符对象
 *
 * @param props 组件属性对象，可能包含模型修饰符
 * @param modelName 需要查询的模型名称（支持驼峰/短横线格式）
 * @returns 返回对应的修饰符对象，若未找到则返回undefined
 *
 * 优先检查'modelValue'和'model-value'的特殊情况，
 * 否则依次尝试以下命名格式：
 * 1. 原始名称 + Modifiers（如：modelNameModifiers）
 * 2. 驼峰格式 + Modifiers（如：modelNameModifiers）
 * 3. 短横线格式 + Modifiers（如：model-name-modifiers）
 */
export const getModelModifiers = (
  props: Record<string, any>,
  modelName: string,
): Record<string, boolean> | undefined => {
  return modelName === 'modelValue' || modelName === 'model-value'
    ? props.modelModifiers
    : props[`${modelName}Modifiers`] ||
      props[`${camelize(modelName)}Modifiers`] ||
      props[`${hyphenate(modelName)}Modifiers`]
}
