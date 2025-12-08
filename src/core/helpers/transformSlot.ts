import { isArray, isFunction, } from '@type-dom/utils';
import { effect } from '@type-dom/signals';
import { isRef } from '../../reactivity/ref';
import { Attributes } from '../../dom/modules/attribute/attribute.interface';
// import { Teleport } from '../../dom/components/teleport/teleport.class';
import { ISlotItem, TypeProps } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
// import { processTeleport } from '../renderer/processTeleport';
import { insertDom } from '../renderer/insertDom';

import { getToDom, mountDom } from './mountDom';
import { createDom } from './createDom';

/**
 * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
 * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
 * @param element
 * @param slot 要添加或插入的子元素或子元素数组。
 * @param type
 */
export function transformSlot<Props extends TypeProps = TypeProps, Attrs extends Attributes = Attributes>(element: TypeElement<Props, Attrs>, slot?: ISlotItem, type: 'add' | 'unshift' = 'add') {
  // console.warn('transformSlot is called . ');
  if (slot === undefined) {
    return;
  }
  /**
   * 如果slot是响应式数据，则意味着会重置childNodes，要对dom 进行清理和添加，会导致dom结构会动态化；需要慎用。
   * slot 需要根据不同条件，渲染不同的组件时还是要用到的。
   * 例如： TdSubMenu 中child，需要根据 rootMenu.isMenuPopup 判断，
   *    也就是根据是否垂直还是水平时，其子菜单是否需要用tooltip。此时返回的对象要单独创建；而不能直接返回 new ClassName 的实例。
   * 注：除了文本， 应该 避免使用
   */
  if (isRef(slot)) {
    // console.warn('slot is ref . ');
    // const newRaw = toRaw(slot);
    // 现在这里基本是监听 动态文本。
    element.addChild(slot);
  } else if (isArray(slot)) {
    for (const item of slot) {
      transformSlot(element, item)
    }
  } else if (isFunction(slot)) {
    // todo slot是方法时，加载好像有问题。
    // todo [() => TypeNode, TypeNode, Ref<string> ]
    //   () => { if T else N }  分支时如何处理 ？
    // todo error 文本和TypeNode切换时，无法触发切换到TypeNode;
    //   () => toggle.get() ? 'hello' : new Div()
    //   error 如果没有响应式数据的获取，会有问题的吧？
    effect(() => {
      const rawSlot = slot();
      // console.error('transformSlot watch . slot is ', slot); // TdCountDown repeat loop .
      if (!element.dom) {
        createDom(element);
      }

      const upDom = mountDom(element);
      // console.warn('upDom is ', upDom);
      if (element.dom) {
        // element is not according to original propose.
        //   element then replace all children when reactivity;
        // element.clearEvents();
        // todo  slot: [ TypeNode, Ref<string> ]
        // todo unmount.
        //  Teleport 在 slot: () => Teleport and Other
        element.clearChildren();
        transformSlot(element, rawSlot); // 这里会addChild
        // todo oldRaw  [undefined, undefined, undefined] ... ...
        // if (oldRaw !== undefined || (isArray(oldRaw) && !isArrayAllUndefined(oldRaw))) { // 非首次渲染，首次渲染会在mountElement中执行。
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
            // if (child.className === 'Teleport') {
            //   element.dom?.appendChild(child.anchorStart!);
            //   element.dom?.appendChild(child.dom!);
            //   element.dom?.appendChild(child.anchor!);
            // }
          })
          // todo if element is fragment, then add children to element.dom, but not up to parent real element.
          // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
          if (element.dom instanceof DocumentFragment) { // todo why add this condition
            // maybe comment replace
            // console.error('element.dom is DocumentFragment . ');
            insertDom(element, upDom);
            // todo child teleports
            // const teleports = element.findDownNodes('Teleport') as Teleport[];
            // teleports.forEach(teleport => {
            //   console.warn('then teleport . ');
            //   processTeleport((teleport));
            // })
          }
        // } else {
        //   // todo oldRaw is undefined , 通常 mount 中会渲染
        //   //  transformSlot(this, computed(() => toggle.get() ? p : undefined))
        //   if (element.isMounted) {
        //     element.childNodes.forEach(child => {
        //       // console.warn('child then mount, it is ', child);
        //       const to = getToDom(child);
        //       child.mount(to ?? element.dom);
        //     })
        //     // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
        //     if (element.dom instanceof DocumentFragment) {
        //       // maybe comment replace
        //       // console.error('element.dom is DocumentFragment . ');
        //       insertDomAndAnchor(element, upDom);
        //     }
        //   }
        // }
      } else {
        console.warn('element.dom is undefined . ', element.dom);
      }
    })
  } else {
    if (type === 'unshift') {
      element.unshiftChild(slot);
    } else {
      element.addChild(slot);
    }
  }
}

// 方法: 使用 every()
// const isArrayAllUndefined = (arr: any[]) => arr.every(item => item === undefined);
