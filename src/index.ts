export type * from './interface';
export * from './parser/index';
// export * from './shared/cssVars'
export { toDisplayString } from './shared/toDisplayString';
export * from './reactivity/index';
// export * from './utils'; // vue3中没有这个
export * from './core/index';
export { render } from './core/renderer/render';

export { createAnchor } from './core/renderer/anchor';
export { removeBetween } from './core/renderer/removeBetween';
export * from './dom/index';
export * from './test-utils';
export * from './util';

import '@type-dom/utils';
