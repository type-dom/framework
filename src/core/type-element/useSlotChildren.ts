/**
 * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
 * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
 * @param slot 要添加或插入的子元素或子元素数组。
 */
import { batchEffect, isRef, toRaw } from '@type-dom/signals';
import { isArray } from '@type-dom/utils';
import { ISlotItem } from '../type-node/type-node.interface';
import { TypeElement } from './type-element.abstract';
import { getToDom, mountDom } from './mountDom';
import { replaceCommentWithDom } from './util';

export function useSlotChildren(element: TypeElement, slot?: ISlotItem) {
  // console.warn('slotChildren is called . ');
  if (slot === undefined) {
    return;
  }
  if (isRef(slot)) {
    batchEffect(() => {
      // console.error('slotChildren effect . slot.get() is ', slot); // TdCountDown repeat loop .
      const newRaw = toRaw(slot);
      if (!element.dom) {
        element.createDom();
      }
      const upDom = mountDom(element);
      if (element.dom) {
        // element is not according to original propose.
        //   element then replace all children when reactivity;
        // element.clearEvents();
        element.clearChildren();
        element.slotChild(newRaw); // todo
        element.childNodes.forEach(child => {
          // console.warn('child then mount, it is ', child);
          const to = getToDom(child);
          // element.dom is Fragment, child.dom not mount to;
          child.mount(to ?? element.dom); // 如果注释了，统计倒计时不显示。
          // child.mount(upDom); // todo repeat loop .
          // element.appendChild(child); // what different between mount and appendChild ?
        })
        // todo   if element is fragment, then add children to element.dom, but not up to parent real element.
        // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
        if (element.dom instanceof DocumentFragment) { // todo why add this condition
          // maybe comment replace
          replaceCommentWithDom(element, upDom);
          // if (upDom && element.comment && isDescendant(upDom, element.comment)) {
          //   upDom.replaceChild(element.dom, element.comment);
          // } else {
          //   upDom?.appendChild(element.dom);
          // }
          // element.mount();
        }
      }
    })
  } else {
    if (isArray(slot)) {
      slot.forEach((item) => {
        if (isRef(item)) {
          element.slotChild(item.get());
        } else {
          element.slotChild(toRaw(item));
        }
      });
    } else {
      element.slotChild(slot)
    }
  }
}
