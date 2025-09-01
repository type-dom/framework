/**
 * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
 * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
 * @param slot 要添加或插入的子元素或子元素数组。
 */
import { isArray, isFunction } from '@type-dom/utils';
import { watch } from '../../reactivity/watch';
import { isRef } from '../../reactivity/ref';
import { ISlotItem } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { getToDom, mountDom } from './mountDom';
import { replaceCommentWithDom } from './toggleCommentAndDom';
import { createDom } from './createDom';

export function useSlotChildren(element: TypeElement, slot?: ISlotItem, type: 'add' | 'unshift' = 'add') {
  // console.warn('slotChildren is called . ');
  if (slot === undefined) {
    return;
  }
  if (isRef(slot)) {
    // console.warn('slot is ref . ');// const newRaw = toRaw(slot);
    watch(slot, (newRaw, oldRaw) => {
      // console.error('slotChildren watch . slot is ', slot); // TdCountDown repeat loop .
      if (!element.dom) {
        createDom(element);
      }
      // if (isString(newRaw) || isNumber(newRaw) && oldRaw === undefined ) { // 忽略 文本 监听
      //   // const text = new TextNode(newRaw);
      //   // text.setParent(element); // todo
      //   // element.childNodes.push(newRaw); // oldRaw === undefined 避免 文本会被多次添加
      //   return;
      // }
      const upDom = mountDom(element);
      // console.warn('upDom is ', upDom);
      if (element.dom) {
        // element is not according to original propose.
        //   element then replace all children when reactivity;
        // element.clearEvents();
        // todo
        element.clearChildren();
        useSlotChildren(element, newRaw);
        element.childNodes.forEach(child => {
          // console.warn('child then mount, it is ', child);
          const to = getToDom(child);
          // element.dom is Fragment, child.dom not mount to;
          // if (element.dom instanceof DocumentFragment) { // todo
          //   console.error('element.dom instanceof DocumentFragment .');
          //   child.mount(to ?? upDom);
          // } else {
          // todo  child.mound 方法中可能包括 Ref 对象， get()方法。会导致循环调用。
          //      如： this.props.refDom.set()
          //      如何避免
            child.mount(to ?? element.dom);
          // }
          // const ele = (element.dom instanceof DocumentFragment ? upDom : element.dom)
          // child.mount(to ?? ele); // 如果注释了，统计倒计时不显示。
          // child.mount(upDom); // todo repeat loop .
          // element.appendChild(child); // what different between mount and appendChild ?
        })
        // todo   if element is fragment, then add children to element.dom, but not up to parent real element.
        // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
        if (element.dom instanceof DocumentFragment) { // todo why add this condition
          // maybe comment replace
          replaceCommentWithDom(element, upDom);
        }
      }
    }, {
      immediate: true
    })
  } else if (isArray(slot)) {
    // slot.forEach((item) => { // todo 应该是递归调用
    //   // if (isRef(item)) {
    //   //   element.slotChild(item.get());
    //   // } else {
    //   //   element.slotChild(toRaw(item));
    //   // }
    // });
    for (const item of slot) {
      useSlotChildren(element, item)
    }
  } else if (isFunction(slot)) {
    useSlotChildren(element, slot());
  } else {
    if (type === 'unshift') {
      // if (slot instanceof TypeNode) {
      //   slot.setParent(element); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      //   if (element.scopedId) {
      //     element.scopedId = element.scopedId ?? element.parent?.scopedId;
      //     slot.scopedId = slot.scopedId ?? element.scopedId;
      //     addAttrProp(slot, slot.scopedId, '');
      //   }
      //   if (currentInstance === element) {
      //     slot.createdIn = 'setup';
      //     element.createdIn = 'setup';
      //   }
      //   element.childNodes.unshift(slot);
      // } else if (typeof slot === 'string' || typeof slot === 'number') {
      //   // const text = new TextNode(slot);
      //   // text.setParent(element);
      //   // element.childNodes.unshift(text);
      // } else {
      //   console.error('useSlotChild: slot is not TypeNode or string or number, it is ', slot);
      // }
      element.unshiftChild(slot);
    } else {
      // if (slot instanceof TypeNode) {
      //   // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      //   slot.setParent(element);
      //   element.scopedId = element.scopedId ?? element.parent?.scopedId;
      //   if (element.scopedId) {
      //     slot.scopedId = slot.scopedId ?? element.scopedId;
      //     addAttrProp(slot, slot.scopedId, '');
      //   }
      //   if (currentInstance === element) {
      //     slot.createdIn = 'setup'; // todo why ???
      //     element.createdIn = 'setup';
      //   }
      //   element.childNodes.push(slot);
      // } else if (typeof slot === 'string' || typeof slot === 'number') {
      //   // const text = new TextNode(slot);
      //   // text.setParent(element);
      //   // element.childNodes.push(text);
      // } else {
      //   console.error('type is ', type, 'useSlotChild: slot is not TypeNode or string or number, it is ', slot);
      // }
      element.addChild(slot);
    }
  }
}
