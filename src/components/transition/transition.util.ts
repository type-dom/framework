import { isArray, isObject, isString } from '@type-dom/utils';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import {
  ANIMATION,
  CSSTransitionInfo,
  ITransitionConfig,
  StylePropertiesKey,
  TransitionUtil,
} from './transition.interface';
import {
  Hook,
  ITypeTransitionConfig,
} from '../../core/type-transition/type-transition.interface';
import { TypeHtml } from '../../core';

const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true,
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};

export function resolveTransitionProps(
  rawProps: ITransitionConfig
): ITypeTransitionConfig<TypeHtml> {
  const baseProps = {} as ITypeTransitionConfig<TypeHtml>;
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      (baseProps as any)[key] = (rawProps as any)[key];
    }
  }

  if (rawProps.css === false) {
    return baseProps;
  }

  const {
    name = 'v',
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`,
  } = rawProps;

  // legacy transition class compat
  // const legacyClassEnabled =
  //   __COMPAT__ &&
  //   compatUtils.isCompatEnabled(DeprecationTypes.TRANSITION_CLASSES, null)
  let legacyEnterFromClass: string;
  let legacyAppearFromClass: string;
  let legacyLeaveFromClass: string;
  // if (__COMPAT__ && legacyClassEnabled) {
  //   const toLegacyClass = (cls: string) => cls.replace(/-from$/, '')
  //   if (!rawProps.enterFromClass) {
  //     legacyEnterFromClass = toLegacyClass(enterFromClass)
  //   }
  //   if (!rawProps.appearFromClass) {
  //     legacyAppearFromClass = toLegacyClass(appearFromClass)
  //   }
  //   if (!rawProps.leaveFromClass) {
  //     legacyLeaveFromClass = toLegacyClass(leaveFromClass)
  //   }
  // }

  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled,
  } = baseProps;

  const finishEnter = (el: Element, isAppear: boolean, done?: () => void) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };

  const finishLeave = (
    el: Element & { _isLeaving?: boolean },
    done?: () => void
  ) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };

  const makeEnterHook = (isAppear: boolean) => {
    return (el: Element, done: () => void) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        // if (__COMPAT__ && legacyClassEnabled) {
        //   const legacyClass = isAppear
        //     ? legacyAppearFromClass
        //     : legacyEnterFromClass
        //   if (legacyClass) {
        //     removeTransitionClass(el, legacyClass)
        //   }
        // }
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };

  return Object.assign(baseProps, {
    onBeforeEnter(element: TypeElement) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      // if (__COMPAT__ && legacyClassEnabled && legacyEnterFromClass) {
      //   addTransitionClass(el, legacyEnterFromClass)
      // }
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(element: TypeElement) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      // if (__COMPAT__ && legacyClassEnabled && legacyAppearFromClass) {
      //   addTransitionClass(el, legacyAppearFromClass)
      // }
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(element: TypeElement & { _isLeaving?: boolean }, done: () => void) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      element._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      // if (__COMPAT__ && legacyClassEnabled && legacyLeaveFromClass) {
      //   addTransitionClass(el, legacyLeaveFromClass)
      // }
      // add *-leave-active class before reflow so in the case of a cancelled enter transition
      // the css will not get the final state (#10677)
      addTransitionClass(el, leaveActiveClass);
      // force reflow so *-leave-from classes immediately take effect (#2593)
      forceReflow();
      nextFrame(() => {
        if (!element._isLeaving) {
          // cancelled
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        // if (__COMPAT__ && legacyClassEnabled && legacyLeaveFromClass) {
        //   removeTransitionClass(el, legacyLeaveFromClass)
        // }
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el as Element, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(element: TypeElement) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(element: TypeElement) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(element: TypeElement) {
      const el = element.dom;
      if (!el) {
        throw Error('element.dom is undefined . ');
      }
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    },
  }) as ITypeTransitionConfig<TypeHtml>;
}

/**
 * #3227 Incoming hooks may be merged into arrays when wrapping Transition
 * with custom HOCs.
 */
const callHook = (
  hook: Hook<any> | Hook<any>[] | undefined,
  args: any[] = []
) => {
  if (isArray(hook)) {
    hook.forEach((h) => h(...args));
  } else if (hook) {
    hook(...args);
  }
};

let endId = 0;

export function whenTransitionEnds(
  el: Element & { _endId?: number },
  expectedType: ITransitionConfig['type'] | undefined,
  explicitTimeout: number | null,
  resolve: () => void
) {
  const id = (el._endId = ++endId);
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };

  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }

  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  console.log(
    'type is ',
    type,
    'timeout is ',
    timeout,
    'propCount is ',
    propCount
  );
  if (!type) {
    return resolve();
  }

  const endEvent = type + 'end';
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e: Event) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}

export const vtcKey = Symbol('_vtc');

export interface ElementWithTransition extends HTMLElement {
  // _vtc = Vue Transition Classes.
  // Store the temporarily-added transition classes on the element
  // so that we can avoid overwriting them if the element's class is patched
  // during the transition.
  [vtcKey]?: Set<string>;
}

function normalizeDuration(
  duration: ITransitionConfig['duration']
): [number, number] | null {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [
      NumberOf((duration as any).enter),
      NumberOf((duration as any).leave),
    ];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}

function NumberOf(val: unknown): number {
  const res = toNumber(val);
  // if (__DEV__) {
  //   assertNumber(res, '<transition> explicit duration')
  // }
  return res;
}

/**
 * Only concerns number-like strings
 * "123-foo" will be returned as-is
 */
export const toNumber = (val: any): any => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};

export function addTransitionClass(el: Element, cls: string) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (
    (el as ElementWithTransition)[vtcKey] ||
    ((el as ElementWithTransition)[vtcKey] = new Set())
  ).add(cls);
}

/**
 * Check if a hook expects a callback (2nd arg), which means the user
 * intends to explicitly control the end of the transition.
 */
const hasExplicitCallback = (
  hook: any // Function | Function[] | undefined,
): boolean => {
  return hook
    ? isArray(hook)
      ? hook.some((h) => h.length > 1)
      : hook.length > 1
    : false;
};

export function removeTransitionClass(el: Element, cls: string) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = (el as ElementWithTransition)[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc!.size) {
      (el as ElementWithTransition)[vtcKey] = undefined;
    }
  }
}

export function nextFrame(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

export function getTransitionInfo(
  el: Element,
  expectedType?: ITransitionConfig['type']
): CSSTransitionInfo {
  const styles = window.getComputedStyle(el) as Pick<
    CSSStyleDeclaration,
    StylePropertiesKey
  >;
  // JSDOM may return undefined for transition properties
  const getStyleProperties = (key: StylePropertiesKey) =>
    (styles[key] || '').split(', ');
  const transitionDelays = getStyleProperties(`${TransitionUtil}Delay`);
  const transitionDurations = getStyleProperties(`${TransitionUtil}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);

  let type: CSSTransitionInfo['type'] = null;
  let timeout = 0;
  let propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TransitionUtil) {
    if (transitionTimeout > 0) {
      type = TransitionUtil;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type =
      timeout > 0
        ? transitionTimeout > animationTimeout
          ? TransitionUtil
          : ANIMATION
        : null;
    propCount = type
      ? type === TransitionUtil
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  const hasTransform =
    type === TransitionUtil &&
    /\b(transform|all)(,|$)/.test(
      getStyleProperties(`${TransitionUtil}Property`).toString()
    );
  return {
    type,
    timeout,
    propCount,
    hasTransform,
  };
}

function getTimeout(delays: string[], durations: string[]): number {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors
function toMs(s: string): number {
  // #8409 default value for CSS durations can be 'auto'
  if (s === 'auto') return 0;
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

/**
 * 该函数用于强制浏览器重新布局（reflow），以使元素处于某种特定状态。它通过返回document.body.offsetHeight来实现强制重排，
 * 因为获取offsetHeight会触发浏览器重新计算元素的布局。在某些情况下，如动态修改元素样式或内容后，需要强制重排以更新页面渲染。
 */
// synchronously force layout to put elements into a certain state
export function forceReflow() {
  return document.body.offsetHeight;
}
