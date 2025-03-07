import { isRef, watch } from '@type-dom/signals';
import { TransitionElement } from '../type-transition/type-transition.interface';
import { TypeElement } from './type-element.abstract';
import { useRecurseRender } from './useRecurseRender';
import { mountDom } from './mountDom';

export function useVIf(element: TypeElement) {
  if (Object.prototype.hasOwnProperty.call(element.props, 'vIf')) {
    // console.warn('element.props has vIf， element is ', element);
    const condition = element.props.vIf;
    // console.warn('condition is ', condition);
    if (isRef(condition)) {
      // console.warn('this.props.vIf is ref');
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        useRawIf(newValue, element, oldValue);
      })
    } else {
      useRawIf(condition, element);
    }
  }
}

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
        useRecurseRender(element);
        upDom.appendChild(element.dom!);
      }
      if (element.transition && oldValue === false) {
        // console.warn('element.transition is existed . ');
        // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
        element.transition.beforeEnter(element.dom as TransitionElement);
        element.transition.enter(element.dom! as TransitionElement);
      }
    } else {
      // 正常挂载（mount)时，element.dom应该不会appendChild(child.dom);
      // console.warn('element.vIf is , ', element.props.vIf, ' then remove dom . ');
      if (element.transition && oldValue) {
        // console.warn('element.transition is existed . ');
        element.transition.leave(element.dom! as TransitionElement, () => {
          element.removeDom();
        });
      } else {
        element.removeDom();
      }
    }
  }
}

