import { isRef, watch } from '../../reactivity';
import { TransitionElement } from '../components/type-transition/type-transition.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { RawDom } from '../type-element/type-element.interface';
import { replaceCommentWithDom, replaceDomWithComment } from './toggleCommentAndDom';
import { createDom } from './createDom';

export function useVIf(element: TypeElement, upDom?: RawDom | null) {
  if (Object.prototype.hasOwnProperty.call(element.baseProps, 'vIf')) {
    // console.warn('element.baseProps has vIf， element is ', element);
    if (upDom) element.to = upDom;
    const condition = element.baseProps.vIf;
    // console.warn('condition is ', condition);
    if (isRef(condition)) {
      // console.warn('this.baseProps.vIf is ref， ', condition);
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        // console.warn('watch useVIf . newValue and oldValue is ', newValue, oldValue);
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
  if (Object.prototype.hasOwnProperty.call(element.baseProps, 'vIf')) {
    if (!element.dom) {
      // console.warn('element.dom is undefined . ');
      createDom(element);
    }
    if (condition) {
      // console.warn('vIf is true, not false or undefined .  ');
      // this.update(); // 会死循环 todo
      // todo anchor 还需要upDom appendChild 吗 ？？
      // const upDom = mountDom(element);
      // if (upDom) {
        // todo useVIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点。
        // useRecurseRender(element); // ?? todo why add it
        // todo 先判断子节点中是否已经包含 element.dom
        replaceCommentWithDom(element);
      // }
      if (element.transition && oldValue === false) {
        // console.warn('element.transition is existed . ');
        // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
        element.transition.beforeEnter(element.dom as TransitionElement);
        element.transition.enter(element.dom! as TransitionElement);
      }
    } else {
      // 正常挂载（mount)时，element.dom应该不会appendChild(child.dom);
      // console.warn('element.vIf is ', element.baseProps.vIf, ' then replace dom witch comment . ');
      element.anchor = element.anchor ?? document.createComment('v-if');
      if (element.transition && oldValue) {
        // console.warn('element.transition is existed . ');
        element.transition.leave(element.dom! as TransitionElement, () => {
          replaceDomWithComment(element)
        });
      } else {
        replaceDomWithComment(element);
      }
    }
  }
}

