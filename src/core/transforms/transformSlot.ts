import { isArray, isFunction, } from '@type-dom/utils';
import { watch } from '../../reactivity/watch';
import { isRef } from '../../reactivity/ref';
import { Attributes } from '../../dom/modules/attribute/attribute.interface';
import { Teleport } from '../../dom/components/teleport/teleport.class';
import { CommentNode } from '../../dom/components/comment-node/comment-node.class';
import { ISlotItem, TypeProps } from '../abstracts/type-node/type-node.interface';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { TypeElement } from '../abstracts/type-element/type-element.abstract';
import { renderAnchor } from '../renderer/anchor';
import { renderTeleport } from '../renderer/renderTeleport';

/**
 * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
 * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
 * todo slot is function , children will be dynamic change . need diff algorithm.
 *      transformSlot 可能会在 created 前触发，导致 anchor/anchorStart 未创建。
 *
 *  应该在setup中调用，不能在 constructor 中调用，否则会影响 createApp 的全局变量创建和继承。
 * @param element
 * @param slot 要添加或插入的子元素或子元素数组。
 * @param type
 */
export function transformSlot<
  Props extends TypeProps = TypeProps,
  Attrs extends Attributes = Attributes
>(element: TypeElement<Props, Attrs>, slot?: ISlotItem | void, type: 'add' | 'unshift' = 'add') {
  // console.warn('transformSlot is called . slot is ', slot);
  if (slot === undefined) {
    return;
  }
  if (slot === null) {
    slot = new CommentNode('empty slot');
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
    //   好像会多次调用。
    // router-view 中路由 params ， slot div 的transformSlot 没有触发更新。
    watch(() => slot.bind(element)(element), (rawSlot, oldSlot) => {
    // effect(() => {
    //   console.warn('transformSlot watch slot() . ');
    //   console.error('rawSlot and oldSlot is ', rawSlot, oldSlot);
      // const rawSlot = slot();
      // console.error('transformSlot watch . slot is ', slot); // TdCountDown repeat loop .
      if (isArray(oldSlot)) {
        for (const item of oldSlot) {
          if (item instanceof TypeNode) item?.unmount();
        }
      } else if (oldSlot instanceof TypeNode) {
        oldSlot.unmount();
      }
      // const container = getNodeContainer(element);
      // console.warn('container is ', container);
      if (element.dom) {
        // element is not according to original propose.
        //   element then replace all children when reactivity;
        // element.clearEvents();
        // todo  slot: [ TypeNode, Ref<string> ]
        // todo unmount.
        //  Teleport 在 slot: () => Teleport and Other
        element.clearChildren();
        if (!rawSlot) {
          rawSlot = new CommentNode('empty slot');
        }
        transformSlot(element, rawSlot); // 这里会addChild
        // todo oldRaw  [undefined, undefined, undefined] ... ...
        // if (oldRaw !== undefined || (isArray(oldRaw) && !isArrayAllUndefined(oldRaw))) { // 非首次渲染，首次渲染会在mountElement中执行。
        // console.warn('oldRaw is undefined . ');
        //   todo resetChildren，  child 可能已经渲染过了，也可能没有挂载过；
        //        还有考虑 tooltip 这种特殊的对象，dom.childNodes 和 childNodes 不一致。
        //        还要考虑 element 是 Fragment 还是普通组件。
        if (element.isMounted) {
          console.warn('element is mounted , need to remount children . ');
          element.childNodes.forEach((child) => { // todo mountChildren replay, over clearChildren
            // if (child.isMounted) {
            //   // console.error('child is mounted , child is ', child);
            // }
            child.mount(element.dom);
          });
        } else {
        // element.mount should  mountChildren(element);
        }
        // todo if element is fragment, then add children to element.dom, but not up to parent real element.
        // when element is TdIcon, element.dom is Icon; need not to upDom appendChild again .
        if (element.dom instanceof DocumentFragment) {
          renderAnchor(element);
          // todo why add this condition
          // maybe comment replace
          // console.error('element.dom is DocumentFragment . ');
          // debugger;
          // renderElement(element, container);
          // if (!oldSlot && !element.anchor?.parentNode) {
          //   console.error('element.anchor.parentNode is undefined . ');
          // }
          if (element.className === 'Teleport') {
            // if (!element.targetAnchor?.parentNode) {
            //   console.error('element.targetAnchor.parentNode is undefined . ');
            // }
            // element.targetAnchor?.parentNode?.insertBefore(
            //   element.dom,
            //   element.targetAnchor
            // );
            renderTeleport(element as unknown as Teleport, element.dom);
          } else {
            element.anchor?.parentNode?.insertBefore(element.dom, element.anchor);
          }
        }
        // } else {
          // todo oldRaw is undefined , mount 中会渲染
        // }
      } else {
        console.warn('element.dom is undefined . ', element.dom);
      }
    }, { immediate: true }); // todo immediate then mountChildren , child.mount ????
  } else {
    // if (!slot) {
    //   slot = new CommentNode('empty slot');
    // }
    if (type === 'unshift') {
      element.unshiftChild(slot);
    } else {
      element.addChild(slot);
    }
  }
}
