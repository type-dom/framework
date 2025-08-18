/// <reference types="node" />
import { isArray, isObject, toNumber } from '@type-dom/utils';
import {
  Hook, TypeTransitionProps
  // TypeTransitionProps
} from '../../../core/components/type-transition/type-transition.interface';
import {
  ANIMATION,
  CSSTransitionInfo,
  TransitionProps,
  StylePropertiesKey,
  TransitionUtil, ElementWithTransition, vtcKey
} from './transition.interface';

const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
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
  leaveToClass: String
};

export function resolveTransitionProps(
  rawProps: TransitionProps
): TypeTransitionProps<Element> {
  // console.warn('resolveTransitionProps . ');
  const baseProps = {} as TypeTransitionProps<Element>;
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
    leaveToClass = `${name}-leave-to`
  } = rawProps;

  // legacy transition class compat
  // const legacyClassEnabled =
  //   __COMPAT__ &&
  //   compatUtils.isCompatEnabled(DeprecationTypes.TRANSITION_CLASSES, null)
  // let legacyEnterFromClass: string;
  // let legacyAppearFromClass: string;
  // let legacyLeaveFromClass: string;
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
    onAppearCancelled = onEnterCancelled
  } = baseProps;

  const finishEnter = (el: Element, isAppear: boolean, done?: () => void) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    if (done) {
      done();
    }
  };

  const finishLeave = (
    el: Element & { _isLeaving?: boolean },
    done?: () => void
  ) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    if (done) {
      done();
    }
  };

  const makeEnterHook = (isAppear: boolean) => {
    return (element: HTMLElement, done: () => void) => {
      // console.warn('makeEnterHook . ');
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(element, isAppear, done);
      callHook(hook, [element, resolve]);
      nextFrame(() => {
        removeTransitionClass(element, isAppear ? appearFromClass : enterFromClass);
        // if (__COMPAT__ && legacyClassEnabled) {
        //   const legacyClass = isAppear
        //     ? legacyAppearFromClass
        //     : legacyEnterFromClass
        //   if (legacyClass) {
        //     removeTransitionClass(el, legacyClass)
        //   }
        // }
        addTransitionClass(element, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(element, type, enterDuration, resolve);
        }
      });
    };
  };

  return Object.assign(baseProps, {
    onBeforeEnter(el: Element) {
      // console.warn('onBeforeEnter . element is ', el);
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      // if (__COMPAT__ && legacyClassEnabled && legacyEnterFromClass) {
      //   addTransitionClass(el, legacyEnterFromClass)
      // }
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el: Element) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      // if (__COMPAT__ && legacyClassEnabled && legacyAppearFromClass) {
      //   addTransitionClass(el, legacyAppearFromClass)
      // }
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el: Element & { _isLeaving?: boolean }, done: () => void) {
      el._isLeaving = true;
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
        if (!el._isLeaving) {
          // cancelled
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        // if (__COMPAT__ && legacyClassEnabled && legacyLeaveFromClass) {
        //   removeTransitionClass(el, legacyLeaveFromClass)
        // }
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el: Element) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el: Element) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el: Element) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  }) as TypeTransitionProps<Element>;
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
    (hook as Hook<any>)(...args);
  }
};

let endId = 0;

export function whenTransitionEnds(
  el: Element & { _endId?: number },
  expectedType: TransitionProps['type'] | undefined,
  explicitTimeout: number | null,
  resolve: () => void
): void | number {
  // console.warn('whenTransitionEnds . el is ', el, ' expectedType is ', expectedType);
  const id = (el._endId = ++endId);
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };

  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout) as unknown as number;
  }

  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  // console.log('getTransitionInfo, type is ', type, 'timeout is ', timeout, 'propCount is ', propCount);
  if (!type) {
    return resolve();
  }

  const endEvent = type + 'end'; // transitionend
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent as keyof ElementEventMap, onEnd);
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
  el.addEventListener(endEvent as keyof ElementEventMap, onEnd);
}

function normalizeDuration(
  duration: TransitionProps['duration']
): [number, number] | null {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [
      NumberOf(duration.enter),
      NumberOf(duration.leave)
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
// export const toNumber = (val: any): any => {
//   const n = isString(val) ? Number(val) : NaN;
//   return isNaN(n) ? val : n;
// };

export function addTransitionClass(el: Element, cls: string) {
  // console.log('addTransitionClass . el is ', el);
  // if (el instanceof TypeNode) {
  //   el = el.dom
  // }
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
  // console.warn('removeTransitionClass . el is ', el);
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
  expectedType?: TransitionProps['type']
): CSSTransitionInfo {
  // console.log('getTransitionInfo . ');
  const styles = window.getComputedStyle(el) as Pick<
    CSSStyleDeclaration,
    StylePropertiesKey
  >;
  // JSDOM may return undefined for transition properties
  const getStyleProperties = (key: StylePropertiesKey) =>
    (styles[key] || '').split(', ');
  const transitionDelays = getStyleProperties(`${TransitionUtil}Delay` as StylePropertiesKey);
  const transitionDurations = getStyleProperties(`${TransitionUtil}Duration` as StylePropertiesKey);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay` as StylePropertiesKey);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration` as StylePropertiesKey);
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
      getStyleProperties(`${TransitionUtil}Property` as StylePropertiesKey).toString()
    );
  return {
    type,
    timeout,
    propCount,
    hasTransform
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
