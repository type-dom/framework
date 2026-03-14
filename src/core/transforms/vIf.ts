import { isRef, watch } from '../../reactivity';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { TransitionElement } from '../abstracts/type-transition/type-transition.interface';
import { RendererElement, } from '../renderer/renderer';
import { renderAnchor } from '../renderer/anchor';
import { renderFragment } from '../renderer/renderFragment';
import { TypeFragment } from '../abstracts';
import { removeBetween } from '../renderer/removeBetween';
import { Teleport } from '../../dom';

/**
 * 处理基于条件的DOM挂载与卸载逻辑，用于实现类似vIf的指令功能。
 * $options.vIf 绑定的属性值，可以是boolean、ref等。
 * mountElement 中会调用。
 * mount 时是不会触发监听的。
 * 显示/隐藏 逻辑，
 *  1.  TypeFragment 显示时挂载的 container, 隐藏时挂载到 DocumentFragment上；
 *  2.  非 Fragment 类型的, 显示时挂载到 container, 隐藏时替换成注释节点。
 * @param element
 * @param container
 */
export function transformIf(element: TypeNode, container: RendererElement) {
  if (hasVIf(element)) {
    // TypeFragment中， anchor === ' className + ]', 则不需要重新赋值。
    //    应该是 非 Fragment 类型的才需要赋值。
    renderAnchor(element);
    // console.warn('element.props has vIf， element is ', element);
    const condition = element.props.vIf;
    // console.warn('condition is ', condition);
    if (isRef(condition)) {
      // console.warn('this.props.vIf is ref， ', condition);
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        // console.warn('watch transformIf . newValue and oldValue is ', newValue, oldValue);
        // console.warn('watch transformIf . element is ', element);
        processIf(container, element, newValue, oldValue);
      },
        // { immediate: true, } // todo 加载就触发有问题
      ); // 加载组件时就要触发
    } else { // 静态判断  mount 时会单独处理的。
      // useRawIf(condition, element);
    }
  }
}

/**
 * 处理基于条件的DOM挂载与卸载逻辑，通常用于实现类似v-if的指令功能。
 * element.comment 占位，应该在 mount 中创建，并添加
 * @param container
 * @param condition
 * @param element
 * @param oldValue
 * @returns void
 */
function processIf(
  container: RendererElement,
  element: TypeNode,
  condition: boolean | unknown,
  oldValue?: unknown
) {
  if (!hasVIf(element)) {
    console.error('element.props has no vIf， ');
    return;
  }
  // todo element 可能还没有被渲染过
  const dom = element.dom;
  if (condition) {
    // 挂载 dom
    // console.warn('vIf is true .  ');
    // this.update(); // 会死循环 todo
    // todo anchor 还需要upDom appendChild 吗 ？？
    // todo transformIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点。
    // todo 先判断子节点中是否已经包含 element.dom
    processIfTrue(element, container);
    if (element.transition && oldValue === false) {
      // console.warn('element.transition is existed . ');
      // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
      element.transition.beforeEnter(dom as TransitionElement);
      element.transition.enter(dom as TransitionElement);
    }
  } else {
    // 卸载 dom
    // 正常挂载（mount)时，element.dom应该不会appendChild(child.dom);
    // console.warn('element.vIf is false , then replace dom witch comment . ');
    if (element.transition && oldValue) {
      // console.warn('element.transition is existed . ');
      element.transition.leave(dom as TransitionElement, () => {
        processIfFalse(element, container);
      });
    } else {
      processIfFalse(element, container);
    }
  }
}

/**
 * vIf false 时调用
 * 使用注释节点替换实际DOM节点，实现条件渲染的隐藏效果。
 * 如果 element.anchor也没有挂载，element.dom 也没有挂载, 则不处理。
 * @param element
 * @param container
 */
export function processIfFalse(element: TypeNode, container: RendererElement) {
  // console.error('processIfFalse ， container is ', container);
  if (!hasVIf(element)) {
    throw new Error('processIfFalse not hasVIf . ');
  }
  /**
   * 确保元素拥有注释节点作为占位符（用于v-if等条件渲染指令）
   * 当element.anchor不存在时创建新的注释节点
   */
  if (!element.anchor) {
    throw new Error('element.anchor is undefined . ');
  }
  /**
   * 核心DOM更新逻辑：
   * 如果元素的DOM节点是应用容器的后代：
   * 1. 使用注释节点替换原有DOM节点（保留位置但移除实际元素）
   * 否则：
   * 2. 将注释节点直接添加到应用容器作为子节点
   * 作用：实现条件渲染的占位符管理，保持DOM结构稳定
   */
  const parentNode = element.anchor?.parentNode;
  if (!parentNode) {
    //   anchor 没有挂载到dom 树中。
    // console.error('vIf is false and parentNode is undefined . ');
  } else {
    try {
      if (element instanceof TypeFragment) {
        // fragment 子元素
        // 子节点如果有 Teleport 的, 子元素会挂载到 teleport.dom 上， 也会不渲染的。
        renderFragment(element, container, false); // 把 fragment 的子节点移动到 DocumentFragment 上；
        // 子元素中的 Teleport，要删除 targetStart/targetAnchor 之间的元素。否则tooltip 会触发显示
        // todo vIf 多层嵌套时，上层true时，下层false，要不要渲染？
        const teleports = element.findDownNodes('Teleport');
        teleports.forEach((teleport) => {
          // console.warn('then teleport . ');
          if (!teleport.targetAnchor || !teleport.targetStart) {
            console.error(
              'element.targetAnchor or element.targetStart is undefined . '
            );
            return;
          }
          removeBetween(
            teleport.targetStart,
            teleport.targetAnchor,
            (teleport as Teleport).dom
          );
        });
      } else {
        // not fragment
        element.dom.remove();
      }
    } catch (error) {
      // fragment 占位符 会一直保存。
      console.error('processIfFalse error is ', error);
    }
  }
}

/**
 * todo 先判断子节点中是否已经包含 element.dom
 * mount/vIf true 时调用
 * mount 时， 判断 props.vIf为true时， 创建 element.dom， 并替换注释节点
 * 首次挂载时， 创建 element.dom，appendChild element.dom
 * 再次挂载时， 替换注释节点
 * todo  Fragment  anchor占位，dom挂载后内容是空的，如果dom要存在内容，需要把子节点再挂载上来。
 *   注： Fragment的 anchor占位，不能被替换，因为替换后是无法被找回的。
 *       应该 mount 时， 创建 element.anchor element.dom , 并且在 dom树上挂载了。
 * @param element
 * @param container
 */
export const processIfTrue = (
  element: TypeNode,
  container: RendererElement,
) => {
  const parentNode = element.anchor?.parentNode;
  if (!parentNode) {
    // console.error('parentNode is undefined . ');
  } else {
    try {
      if (element instanceof TypeFragment) {
        // fragment 子元素
        // 子节点如果有 Teleport to 的, 子元素会挂载到 teleport.dom 上， 也会不渲染的。
        renderFragment(element, container); // 把 fragment 的子节点显示出来；

        // 子元素中的 Teleport，要填回 targetStart/targetAnchor 之间的元素。
        // todo vIf 多层嵌套时，上层true时，下层false，要不要渲染？
        const teleports = element.findDownNodes('Teleport');
        teleports.forEach((teleport) => {
          // console.warn('then teleport . ');
          if (!teleport.targetAnchor || !teleport.targetStart) {
            console.error(
              'element.targetAnchor or element.targetStart is undefined . '
            );
            return;
          }
          teleport.targetAnchor.parentNode?.insertBefore(
            teleport.dom,
            teleport.targetAnchor
          );
        });
      } else {
        // not fragment
        parentNode.insertBefore(element.dom, element.anchor!);
      }
    } catch (error) {
      // fragment 占位符 会一直保存。
      console.error('processIfFalse error is ', error);
    }
  }
};

export const hasVIf = (element: TypeNode) => element.props && Object.prototype.hasOwnProperty.call(element.props, 'vIf');

