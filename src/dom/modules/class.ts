// import { type ElementWithTransition, vtcKey } from '../../../components/Transition'

import { type ElementWithTransition, vtcKey } from "../components/transition/transition.interface"
import { isArray, isString } from '@type-dom/utils';

// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
export function patchClass(
  el: Element,
  value: string | null,
  isSVG: boolean,
): void {
  // directly setting className should be faster than setAttribute in theory
  // if this is an element during a transition, take the temporary transition
  // classes into account.
  const transitionClasses = (el as ElementWithTransition)[vtcKey]
  if (transitionClasses) {
    value = (
      value ? [value, ...transitionClasses] : [...transitionClasses]
    ).join(' ')
  }
  if (value == null) {
    el.removeAttribute('class')
  } else if (isSVG) {
    el.setAttribute('class', value)
  } else {
    el.className = value
  }
}

// add by me from element-plus
export const classNameToArray = (cls = '') =>
  cls.split(' ').filter((item) => !!item.trim())

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

// edit by me
export const addDomClass = (el?: Element, cls?: string | string[]) => {
  // if (typeof cls !== 'string') {
  //   console.warn('cls is not string');
  //   return;
  // }
  // console.warn('addClass . cls is ', cls);
  if (!el) return; // todo || !cls?.trim()
  // el.className = ''; // 不兼容 SVGElement
  // 清空现有类名
  el.classList.remove(...Array.from(el.classList));
  if (isString(cls)) {
    el.classList.add(...classNameToArray(cls.trim()));
  } else if (isArray(cls)) {
    const hasSpace = cls.some(item => /\s/.test(item));
    // 使用 \s 正则表达式可匹配空格、制表符等空白字符
    if (hasSpace) {
      // console.warn('cls hasSpace . ');
      cls = cls.flatMap(className =>
        className.trim().split(/\s+/) // 拆分子项并展平
      );
      // console.log('cls is ', cls);
    }
    el.classList.add(...cls);
  } else {
    console.error('cls is undefined ');
  }
};

// export const addClass = (el: Element, cls: string) => {
//   if (!el || !cls.trim()) return
//   el.classList.add(...classNameToArray(cls))
// }

export const removeDomClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}
