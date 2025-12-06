import { isRef, watch } from '../../reactivity';
import { TransitionElement } from '../components/type-transition/type-transition.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { insertDomAndAnchor, anchorReplaceDom } from './anchorAndDom';
import { createDom } from './createDom';

/**
 * 处理基于条件的DOM挂载与卸载逻辑，用于实现类似vIf的指令功能。
 * baseProps.vIf 绑定的属性值，可以是boolean、ref等。
 * mountElement 中会调用。
 * @param element
 */
export function useVIf(element: TypeNode) {
  if (Object.prototype.hasOwnProperty.call(element.baseProps, 'vIf')) {
    // console.warn('element.baseProps has vIf， element is ', element);
    // if (upDom) element.to = upDom; // todo why  这一步有很多潜在风险的。
    const condition = element.baseProps.vIf;
    // console.warn('condition is ', condition);
    if (isRef(condition)) {
      // console.warn('this.baseProps.vIf is ref， ', condition);
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        // console.warn('watch useVIf . newValue and oldValue is ', newValue, oldValue);
        // console.warn('watch useVIf . element is ', element);
        useRawIf(newValue, element, oldValue);
      },
        // { immediate: true, } // todo 加载就触发有问题
      ); // 加载组件时就要触发
    } else { // 静态判断 todo mount 时会单独处理的啊。是否要注释掉呢？
      // useRawIf(condition, element);
    }
  }
}

/**
 * 处理基于条件的DOM挂载与卸载逻辑，通常用于实现类似v-if的指令功能。
 * element.comment 占位，应该在 mount 中创建，并添加
 * @param condition
 * @param element
 * @param oldValue
 * @returns void
 */
function useRawIf(condition: boolean | unknown, element: TypeNode, oldValue?: unknown) {
  if (!Object.prototype.hasOwnProperty.call(element.baseProps, 'vIf')) {
    console.error('element.baseProps has no vIf， ');
    return;
  }
    // todo element 可能还没有被渲染过
    const dom = createDom(element);
    if (condition) { // 挂载 dom
      // console.warn('vIf is true, not false or undefined .  ');
      // this.update(); // 会死循环 todo
      // todo anchor 还需要upDom appendChild 吗 ？？
      // const upDom = mountDom(element);
      // if (upDom) {
        // todo useVIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点。
        // useRecurseRender(element); // ?? todo why add it
        // todo 先判断子节点中是否已经包含 element.dom
      insertDomAndAnchor(element);
      // }
      if (element.transition && oldValue === false) {
        // console.warn('element.transition is existed . ');
        // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
        element.transition.beforeEnter(dom as TransitionElement);
        element.transition.enter(dom as TransitionElement);
      }
    } else { // 卸载 dom
      // 正常挂载（mount)时，element.dom应该不会appendChild(child.dom);
      // console.warn('element.vIf is false , then replace dom witch comment . ');
      element.anchor = element.anchor ?? document.createComment('v-if');
      if (element.transition && oldValue) {
        // console.warn('element.transition is existed . ');
        element.transition.leave(dom as TransitionElement, () => {
          anchorReplaceDom(element);
        });
      } else {
        anchorReplaceDom(element);
      }
    }
}

