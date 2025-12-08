import { NO } from '@type-dom/utils';
import { AppContext } from './app.interface';
import { App } from './app.class';

export function createAppContext(): AppContext {
  return {
    app: null as App | null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {},
    },
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
