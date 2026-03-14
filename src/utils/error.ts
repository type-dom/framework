import { inBrowser, isPromise } from '@type-dom/utils';
// import { pushTarget, popTarget } from '../observer/dep';
import { TypeNode } from '../core/abstracts/type-node/type-node.abstract';

// import { Config } from '../config'

export function handleError(err: Error, vm: any, info: string) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  // pushTarget();
  try {
    if (vm) {
      let cur = vm;
      while ((cur = cur.$parent)) {
        const hooks = cur.props.errorCaptured;
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              const capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) return;
            } catch (e: any) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    // popTarget();
  }
}

export function invokeWithErrorHandling(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !(res as any)._handled) {
      res.catch((e) => handleError(e, vm, info + ` (Promise/async)`));
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      (res as any)._handled = true;
    }
  } catch (e: any) {
    handleError(e, vm, info);
  }
  return res;
}

function globalHandleError(err: Error, vm: TypeNode | null, info: string) {
  // if (config.errorHandler) {
  //   try {
  //     return config.errorHandler.call(null, err, vm, info)
  //   } catch (e: any) {
  //     // if the user intentionally throws the original error in the handler,
  //     // do not log it twice
  //     if (e !== err) {
  //       logError(e, null, 'config.errorHandler')
  //     }
  //   }
  // }
  logError(err, vm, info);
}

function logError(err: Error, _vm: TypeNode | null, _info: string) {
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
