import { isRef, MaybeRef, watch } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { getStyle } from '@type-dom/utils';
import { TransitionElement } from '../type-transition/type-transition.interface';
import { TypeElement } from './type-element.abstract';

export function useVShow(element: TypeElement) {
  const condition: MaybeRef<boolean | unknown> = element.props.vShow;
  if (Object.prototype.hasOwnProperty.call(element.props, 'vShow')) {
    // console.warn('element.props has vShow');
    if (isRef(condition)) {
      // console.warn('this.props.vShow is ref');
      // 添加 监听
      watch(condition, (newValue, oldValue) => {
        // console.warn('newValue', newValue);
        useRawVShow(newValue, element, oldValue);
      })
    } else {
      // when this element mount , should useShow
      useRawVShow(condition, element);
    }
  }
}

function useRawVShow(condition: boolean | unknown, element: TypeElement, oldValue?: unknown) {
  let display: IStyle['display'];
  if (!element.dom) { // todo TdCollapse 加载有问题，全部显示了。vShow赋值时，dom可能还没有渲染。不能直接拦截。
    // console.warn('element.dom is undefined');
    element.createDom();
  }
  if (element.dom instanceof HTMLElement || element.dom instanceof SVGAElement) {
    display = getStyle(element.dom, 'display');
  }
  if (condition) {
    display = element.style?.get('display') ?? display;
    if (element.transition) {
      console.warn('element.transition is existed . ');
      // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
      element.transition.beforeEnter(element.dom as TransitionElement);
      element.transition.enter(element.dom! as TransitionElement);
      if (display && display !== 'none') { // todo TdCollapse can not open
        element.style?.setObj({
          display: display,
        });
      } else {
        element.style?.remove('display'); // todo optimize
      }
    } else {
      if (display && display !== 'none') { // todo TdCollapse can not open
        element.style?.setObj({
          display: display,
        });
      } else {
        element.style?.remove('display'); // todo optimize
      }
    }
  } else {
    if (element.transition && oldValue) {
      console.warn('element.transition is existed . ');
      element.transition.leave(element.dom! as TransitionElement, () => {
        element.style?.setObj({
          display: 'none',
        });
      });
    } else {
      element.style?.setObj({
        display: 'none',
      });
    }
  }
}
