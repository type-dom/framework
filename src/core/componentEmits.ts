// import {
//   EMPTY_OBJ,
//   type OverloadParameters,
//   type UnionToIntersection,
//   camelize,
//   extend,
//   hasOwn,
//   hyphenate,
//   isArray,
//   isFunction,
//   isObject,
//   isOn,
//   isString,
//   looseToNumber,
//   toHandlerKey,
// } from '@vue/shared'
import {
  EMPTY_OBJ,
  isArray, extend,
  // type OverloadParameters,
  type UnionToIntersection,
  camelize,
  // extend,
  // hasOwn,
  // hyphenate,
  // isArray,
  // isFunction,
  isString,
  looseToNumber,
  // isObject,
  // isOn,
  // isString,
  // looseToNumber,
  // AnyFn,
  toHandlerKey, isObject,
  isFunction,
} from '@type-dom/utils';
import { hasOwn, hyphenate, isOn } from '@type-dom/utils';
import { AppContext } from '../dom/components/app/app.interface';
// import {
//   // type ComponentInternalInstance,
//   // type ComponentOptions,
//   // type ConcreteComponent,
//   formatComponentName,
// } from './component'
import { ErrorCodes, callWithAsyncErrorHandling } from './errorHandling'
import { warn } from './warning'
// // import { devtoolsComponentEmit } from './devtools'
// // import type { AppContext } from './apiCreateApp'
// // import { emit as compatInstanceEmit } from './compat/instanceEventEmitter'
// // import {
// //   compatModelEmit,
// //   compatModelEventPrefix,
// // } from './compat/componentVModel'
import type { ComponentTypeEmits } from './apiSetupHelpers'
import { getModelModifiers } from './helpers/useModel'
// import { ComponentOptions } from './componentOptions';
// // import type { ComponentPublicInstance } from './componentPublicInstance'
import { TypeNode } from './abstracts/type-node/type-node.abstract';
//
export type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>

export type EmitsOptions = ObjectEmitsOptions | string[];

export type EmitsToProps<T extends EmitsOptions | ComponentTypeEmits> =
  T extends string[]
    ? {
        [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any
      }
    : T extends ObjectEmitsOptions
      ? {
          [K in string & keyof T as `on${Capitalize<K>}`]?: (
            ...args: T[K] extends (...args: infer P) => any
              ? P
              : T[K] extends null
                ? any[]
                : never
          ) => any
        }
      : object // empty object

// // export type TypeEmitsToOptions<T extends ComponentTypeEmits> = {
// //   [K in keyof T & string]: T[K] extends [...args: infer Args]
// //     ? (...args: Args) => any
// //     : () => any
// // } & (T extends (...args: any[]) => any
// //   ? ParametersToFns<OverloadParameters<T>>
// //   : {})
//
// type ParametersToFns<T extends any[]> = {
//   [K in T[0]]: IsStringLiteral<K> extends true
//     ? (
//         ...args: T extends [e: infer E, ...args: infer P]
//           ? K extends E
//             ? P
//             : never
//           : never
//       ) => any
//     : never
// }
//
// type IsStringLiteral<T> = T extends string
//   ? string extends T
//     ? false
//     : true
//   : false
//
// export type ShortEmitsToObject<E> =
//   E extends Record<string, any[]>
//     ? {
//         [K in keyof E]: (...args: E[K]) => any
//       }
//     : E

export type EmitFn<
  Options = ObjectEmitsOptions,
  Event extends keyof Options = keyof Options,
> =
  Options extends Array<infer V>
    ? (event: V, ...args: any[]) => void
    : object extends Options // if the emit is empty object (usually the default value for emit) should be converted to function
      ? (event: string, ...args: any[]) => void
      : UnionToIntersection<
          {
            [key in Event]: Options[key] extends (...args: infer Args) => any
              ? (event: key, ...args: Args) => void
              : Options[key] extends any[]
                ? (event: key, ...args: Options[key]) => void
                : (event: key, ...args: any[]) => void
          }[Event]
        >

export function emit(
  instance: TypeNode,
  event: string,
  ...rawArgs: any[]
) {
  // console.warn('event is ', event);
  if (instance.isUnmounted) return;
  const props = instance.props || EMPTY_OBJ;

  // if (__DEV__) {
    const {
      emitsOptions,
      // propsOptions: [propsOptions],
    } = instance;
    if (emitsOptions) {
  //     if (
  //       !(event in emitsOptions)
  //       // &&
  //       // !(
  //       //   __COMPAT__ &&
  //       //   (event.startsWith('hook:') ||
  //       //     event.startsWith(compatModelEventPrefix))
  //       // )
  //     ) {
  //       if (!propsOptions || !(toHandlerKey(camelize(event)) in propsOptions)) {
  //         warn(
  //           `Component emitted event "${event}" but it is neither declared in ` +
  //             `the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`,
  //         )
  //       }
  //     } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(
              `Invalid event arguments: event validation failed for event "${event}", isValid is "${isValid}" .`,
            )
          }
        }
      }
    // }
  // }

  let args = rawArgs;
  // const isCompatModelListener =
  //   __COMPAT__ && compatModelEventPrefix + event in props
  const isModelListener = /* isCompatModelListener || */ event.startsWith('update:');
  const modifiers = // isCompatModelListener
    // ? props.modelModifiers
    isModelListener && getModelModifiers(props, event.slice(7));

  // for v-model update:xxx events, apply modifiers on args
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map(a => (isString(a) ? a.trim() : a));
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }

  // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
  //   devtoolsComponentEmit(instance, event, args)
  // }

  // if (__DEV__) {
  //   const lowerCaseEvent = event.toLowerCase()
  //   if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
  //     warn(
  //       `Event "${lowerCaseEvent}" is emitted in component ` +
  //         `${formatComponentName(
  //           instance,
  //           instance,
  //         )} but the handler is registered for "${event}". ` +
  //         `Note that HTML attributes are case-insensitive and you cannot use ` +
  //         `v-on to listen to camelCase events when using in-DOM templates. ` +
  //         `You should probably use "${hyphenate(
  //           event,
  //         )}" instead of "${event}".`,
  //     )
  //   }
  // }

  let handlerName;
  let handler =
    props[(handlerName = toHandlerKey(event))] ||
    // also try camelCase event handler (#2249)
    props[(handlerName = toHandlerKey(camelize(event)))];
  // console.warn('handleName is ', handlerName);
  // for v-model update:xxx events, also trigger kebab-case equivalent
  // for props passed via kebab-case
  if (!handler && isModelListener) {
    handler = props[(handlerName = toHandlerKey(hyphenate(event)))]
  }

  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      ErrorCodes.COMPONENT_EVENT_HANDLER,
      args,
    )
  }

  const onceHandler = props[handlerName + `Once` as `on${Capitalize<string>}`]
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {}
    } else if (instance.emitted[handlerName]) {
      return
    }
    instance.emitted[handlerName] = true
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      ErrorCodes.COMPONENT_EVENT_HANDLER,
      args,
    )
  }

  // if (__COMPAT__) {
  //   compatModelEmit(instance, event, args)
  //   return compatInstanceEmit(instance, event, args)
  // }
}

/**
 * 标准化组件的 emits 选项，将其转换为统一的对象格式。
 *
 * @param comp - 组件类型节点
 * @param appContext - 应用上下文，包含 emits 缓存等信息
 // * @param asMixin - 指示当前组件是否作为 mixin 处理，默认为 false
 * @returns 标准化的 ObjectEmitsOptions 对象或 null（如果没有定义 emits）
 */
export function normalizeEmitsOptions<Comp extends TypeNode>(
  comp: Comp,
  appContext: AppContext,
  // asMixin = false,
): ObjectEmitsOptions | null {
  // 检查缓存中是否有已标准化的 emits 选项
  const cache = appContext.emitsCache
  const cached = cache.get(comp)
  if (cached !== undefined) {
    return cached
  }

  // 获取原始的 emits 定义
  const raw = comp.props.emits
  let normalized: ObjectEmitsOptions = {}

  // 应用 mixin/extends 的 emits
  let hasExtends = false
  // if (__FEATURE_OPTIONS_API__ && !isFunction(comp)) {
  //   const extendEmits = (raw: TypeNode) => {
  //     const normalizedFromExtend = normalizeEmitsOptions(raw, appContext)
  //     if (normalizedFromExtend) {
  //       hasExtends = true
  //       extend(normalized, normalizedFromExtend)
  //     }
  //   }
    // 如果不是作为 mixin 处理且应用上下文中有 mixins，则处理这些 mixins
    // if (!asMixin && appContext.mixins.length) {
    //   appContext.mixins.forEach(extendEmits)
    // }
    // todo 继承的组件的 emits 要继承
    // 如果组件有 extends 属性，则处理继承的组件
    // if (comp.extends) {
    //   extendEmits(comp.extends)
    // }
    // if (comp.super) {
    //   extendEmits(comp.super)
    // }
    // 如果组件有 mixins 属性，则处理这些 mixins
    // if (comp.mixins) {
    //   comp.mixins.forEach(extendEmits)
    // }
  // }

  // 如果没有原始 emits 定义且没有扩展，则直接返回 null
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null)
    }
    return null
  }

  // 将原始的 emits 转换为对象格式
  if (isArray(raw)) {
    // 如果是数组格式，则将每个元素作为键，值设为 null
    raw.forEach(key => (normalized[key] = null))
  } else {
    // 否则直接扩展到标准化对象中
    extend(normalized, raw)
  }

  // 将标准化的结果设置到缓存中
  if (isObject(comp)) {
    cache.set(comp, normalized)
  }
  return normalized
}

// Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.
export function isEmitListener(
  options: ObjectEmitsOptions | null,
  key: string,
): boolean {
  if (!options || !isOn(key)) {
    return false
  }

  // if (__COMPAT__ && key.startsWith(compatModelEventPrefix)) {
  //   return true
  // }

  key = key.slice(2).replace(/Once$/, '')
  return (
    hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
    hasOwn(options, hyphenate(key)) ||
    hasOwn(options, key)
  )
}
