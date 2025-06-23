import { isRef, watch } from '@type-dom/signals';
import { TransitionElement } from '../type-transition/type-transition.interface';
import { TypeElement } from './type-element.abstract';
import { mountDom } from './mountDom';
import { replaceCommentWithDom, replaceDomWithComment } from './util';
import { TdDom } from './type-element.interface';

export function useVIf(element: TypeElement, upDom?: TdDom | null) {
  if (Object.prototype.hasOwnProperty.call(element.props, 'vIf')) {
    // console.warn('element.props has vIf， element is ', element);
    if (upDom) element.to = upDom;
    const condition = element.props.vIf;
    // console.warn('condition is ', condition);
    if (isRef(condition)) {
      // console.warn('this.props.vIf is ref， ', condition);
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        useRawIf(newValue, element, oldValue);
      },
        // { immediate: true, } // todo 加载就触发有问题
      ); // 加载组件时就要触发
    } else {
      useRawIf(condition, element);
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
export function useRawIf(condition: boolean | unknown, element: TypeElement, oldValue?: unknown) {
  if (Object.prototype.hasOwnProperty.call(element.props, 'vIf')) {
    if (!element.dom) {
      // console.warn('element.dom is undefined . ');
      element.createDom();
    }
    if (condition) {
      // console.warn('vIf true . ');
      // this.update(); // 会死循环 todo
      const upDom = mountDom(element);
      if (upDom) {
        // todo useVIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点。
        // useRecurseRender(element); // ?? todo why add it
        // if (upDom.childNodes.indexOf(element.dom!))
        // todo 先判断子节点中是否已经包含 element.dom
        replaceCommentWithDom(element);
      }
      if (element.transition && oldValue === false) {
        // console.warn('element.transition is existed . ');
        // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
        element.transition.beforeEnter(element.dom as TransitionElement);
        element.transition.enter(element.dom! as TransitionElement);
      }
    } else {
      // 正常挂载（mount)时，element.dom应该不会appendChild(child.dom);
      // console.warn('element.vIf is , ', element.props.vIf, ' then replace dom witch comment . ');
      element.comment = element.comment ?? document.createComment('v-if is false ');
      if (element.transition && oldValue) {
        // console.warn('element.transition is existed . ');
        element.transition.leave(element.dom! as TransitionElement, () => {
          // element.removeDom(); // parentNode.replaceChild(newNode, oldNode);
          replaceDomWithComment(element)
        });
      } else {
        // element.removeDom();
        replaceDomWithComment(element);
      }
    }
  }
}

