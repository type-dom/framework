// import { NOOP } from '@type-dom/utils';

export * from './abstracts';
export { warn } from './warning';
// export const warn = (__DEV__ ? _warn : NOOP) as typeof _warn;

export * from './event-emitter/event-emitter';
export type * from './event-emitter/event-emitter.interface';

// export * from './util';
export { createApp, type Plugin } from './apiCreateApp';
export {
  onBeforeCreate,
  onCreated,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onRenderTracked,
  onRenderTriggered,
  onErrorCaptured,
  onServerPrefetch,
} from './apiLifecycle'
export { provide, inject, hasInjectionContext } from './apiInject'
export * from './scheduler'
export { useAttrs, useSlots } from './apiSetupHelpers'
export * from './renderer';
// export { defineExpose } from './defineExpose';
// export { useModel } from './helpers/useModel'
// export { useTemplateRef, type TemplateRef } from './helpers/useTemplateRef'
export { useId } from './helpers/useId'
// export {
//   hydrateOnIdle,
//   hydrateOnVisible,
//   hydrateOnMediaQuery,
//   hydrateOnInteraction,
// } from './hydrationStrategies'

// <script setup> API ----------------------------------------------------------

export {
  // macros runtime, for typing and warnings only
  // defineProps,
  // defineEmits,
  // defineExpose,
  // defineOptions,
  // defineSlots,
  // defineModel,
  // withDefaults,
  // type DefineProps,
  // type ModelRef,
  // type ComponentTypeEmits,
} from './apiSetupHelpers'

/**
 * @internal
 */
// export {
//   mergeDefaults,
//   mergeModels,
//   createPropsRestProxy,
//   withAsyncContext,
// } from './apiSetupHelpers'

// Advanced API ----------------------------------------------------------------

// For getting a hold of the internal instance in setup() - useful for advanced
// plugins
export { getCurrentInstance, setCurrentInstance } from './component'

// Advanced render function utilities
export { // createVNode, cloneVNode,
  mergeProps, isTypeNode } from './vnode'
export type { InjectionKey } from './apiInject'
export type {
  ComponentOptions,
  ComponentOptionsMixin,
  ComponentCustomOptions,
  ComponentOptionsBase,
  ComponentProvideOptions,
  RenderFunction,
  MethodOptions,
  ComputedOptions,
  RuntimeCompilerOptions,
  ComponentInjectOptions,
  // deprecated
  // ComponentOptionsWithoutProps,
  // ComponentOptionsWithArrayProps,
  // ComponentOptionsWithObjectProps,
} from './componentOptions'
export type {
  EmitsOptions,
  ObjectEmitsOptions,
  EmitsToProps,
  // ShortEmitsToObject,
  EmitFn,
} from './componentEmits'
export {
  emit,
  isEmitListener,
} from './componentEmits';
// export type {
//   ComponentPublicInstance,
//   ComponentCustomProperties,
//   CreateComponentPublicInstance,
//   CreateComponentPublicInstanceWithMixins,
// } from './componentPublicInstance'

// export type { RootHydrateFunction } from './hydration'
// export type { Slot, Slots, SlotsType } from './componentSlots'
export type {
  Prop,
  PropType,
  // ComponentPropsOptions,
  // ComponentObjectPropsOptions,
  ExtractPropTypes,
  ExtractPublicPropTypes,
  ExtractDefaultPropTypes,
} from './componentProps'
export * from './enums';

// export * from './warning';

export { assignProps } from './helpers/assignProps';
export { findDown, findAll } from './helpers/findDown';
export { defaultProps } from './helpers/defaultProps';
export { renderList } from './helpers/renderList';
export { toHandlers } from './helpers/toHandlers'
// export { useRecurseRender } from './helpers/useRecurseRender';
export { transformSlot } from './transforms/transformSlot';
export * from './decorators/index';
