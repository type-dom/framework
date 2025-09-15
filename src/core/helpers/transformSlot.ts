import { isArray, isFunction } from '@type-dom/utils';
import { watch } from '../../reactivity/watch';
import { isRef } from '../../reactivity/ref';
import { ISlotItem } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { getToDom, mountDom } from './mountDom';
import { insertDomAndAnchor } from './anchorAndDom';
import { createDom } from './createDom';

/**
 * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
 * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
 * @param element
 * @param slot 要添加或插入的子元素或子元素数组。
 * @param type
 */
export function transformSlot(element: TypeElement, slot?: ISlotItem, type: 'add' | 'unshift' = 'add') {
  // console.warn('transformSlot is called . ');
  if (slot === undefined) {
    return;
  }
  // if ((slot as any).countAdd) { // todo error
  //   (slot as any).countAdd = (slot as any).countAdd + 1
  // } {
  //   (slot as any).countAdd = 1;
  // }
  // console.warn('slot add ', (slot as any).countAdd);
  /**
   * 如果slot是响应式数据，则意味着会重置childNodes，要对dom 进行清理和添加，会导致dom结构会动态化；需要慎用。
   * slot 需要根据不同条件，渲染不同的组件时还是要用到的。
   * 例如： TdSubMenu 中child，需要根据 rootMenu.isMenuPopup 判断，
   *    也就是根据是否垂直还是水平时，其子菜单是否需要用tooltip。此时返回的对象要单独创建；而不能直接返回 new ClassName 的实例。
   * 注：除了文本， 应该 避免使用
   */
  if (isRef(slot)) {
    // console.warn('slot is ref . ');// const newRaw = toRaw(slot);
    // 现在这里基本是监听 动态文本了。
    /**
     */
    watch(slot, (newRaw, oldRaw) => {
      // console.error('transformSlot watch . slot is ', slot); // TdCountDown repeat loop .
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
        transformSlot(element, newRaw); // 这里会addChild
        if (oldRaw !== undefined) { // 非首次渲染，首次渲染会在mountElement中执行。
        // console.warn('oldRaw is undefined . ');
        //   todo resetDom，  child 可能已经渲染过了，也可能没有挂载过；
        //        还有考虑 tooltip 这种特殊的对象，dom.childNodes 和 childNodes 不一致。
        //        还要考虑 element 是 Fragment 还是普通组件。
          element.childNodes.forEach(child => {
            // console.warn('child then mount, it is ', child);
            const to = getToDom(child);
            // console.error('to is ', to);
            // element.dom is Fragment, child.dom not mount to;
            // if (element.dom instanceof DocumentFragment) { // todo
            //   console.error('element.dom instanceof DocumentFragment .');
            //   child.mount(to ?? upDom);
            // } else {
            // todo  child.mound 方法中可能包括 Ref 对象， get()方法。会导致循环调用。
            //  如： this.props.refDom.set()
            //      如何避免
            // const ele = (element.dom instanceof DocumentFragment ? upDom : element.dom)
            // child.mount(to ?? ele); // 如果注释了，统计倒计时不显示。
            // child.mount(upDom); // todo repeat loop .
            child.mount(to ?? element.dom);
            // element.appendChild(child); // what different between mount and appendChild ?
            // }
          })
          // todo   if element is fragment, then add children to element.dom, but not up to parent real element.
          // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
          if (element.dom instanceof DocumentFragment) { // todo why add this condition
            // maybe comment replace
            // console.error('element.dom is DocumentFragment . ');
            insertDomAndAnchor(element, upDom);
          }
        } else {
        //   todo mounted
        //        update
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
      transformSlot(element, item)
    }
  } else if (isFunction(slot)) { // todo slot是方法时，加载好像有问题。
    transformSlot(element, slot());
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
      // if (slot instanceof TypeNode) { // todo error 会有 引入错误。
      //   if (slot.className === 'TdMenuItem') {
      //     console.error('newChild is TdMenuItem');
      //   }
      //   if (slot.className === 'UL') {
      //     console.error('newChild is UL . this is ', element);
      //   }
      //   // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      //   // 如果两个不同的组件的添加了newChild 会被加载两次，parent会被重置。如 vIf vElse 时，props.slot会在两个不同的分支组件中加载；
      //   //   todo newChild 是否要改为 类 本身， 然后 new Constructor(params).  ----> 无法解决 vIf,vElse
      //   // if (slot.parent) {
      //   //   slot = new (slot.constructor as any)(slot.params) as TypeNode;
      //   // }
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
      // } else if (isNumber(slot) || isString(slot)) {
      //   const text = new TextNode(slot);
      //   text.setParent(element);
      //   element.childNodes.push(text);
      // } else {
      //   console.error('newChild  is ', slot);
      // }
      // todo vIf vElse slot中引用了相同的 props.slot 会改变 props.slot 的 parent；导致 inject 失效。
      // if (Object.hasOwnProperty.call(element.baseProps, 'vIf')) {
      //   if (!unref(element.baseProps.vIf)) {
      //   //   不要重置 parent
      //     element.addChildWithoutParent(slot);
      //     return;
      //   }
      //   element.addChild(slot);
      // } else {
      //   element.addChild(slot);
      // }
      element.addChild(slot);
    }
  }
}
