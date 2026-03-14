import { setDomStyle } from '@type-dom/utils';
import { isRef, MaybeRef, unref, watch } from '../../reactivity';
import { removeStyleProp } from '../../dom/modules/style/style';
import { TransitionElement } from '../abstracts/type-transition/type-transition.interface';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { initShow, VShowElement, vShowOriginalDisplay } from './initShow';

export function transformShow(element: TypeNode) {
  if (element.props && Object.prototype.hasOwnProperty.call(element.props, 'vShow')) {
    // console.warn('element.props has vShow');
    const condition: MaybeRef<boolean | unknown> = element.props.vShow;
    initShow(element, unref(condition));
    if (isRef(condition)) {
      // if (element.className === 'TdScrollbar') {
      //   console.warn('this.props.vShow is ', condition);
      // }
      // 添加 监听 todo watch 有问题；
      //    todo 要触发 updated 才生效
      watch(() => condition.get(), (newValue, oldValue) => {
        // console.warn('newValue', newValue);
        processShow(!!newValue, element, oldValue); // newValue is undefine时，要赋值 false
        // showUpdate(element, newValue, oldValue);
      }, {
        immediate: true
      })
    } else {
      // when this element mount , should useShow
      processShow(condition, element);
      // vShow(element, condition)
    }
  }
}

function processShow(condition: boolean | unknown, element: TypeNode, oldValue?: unknown) {
  const display =  (element.dom as VShowElement)[vShowOriginalDisplay];
  const transition = element.transition;
  if (condition) {
    // display = element.style?.get('display') as string ?? display;
    if (transition) {
      // console.warn('element.transition is existed . ');
      // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
      transition.beforeEnter(element.dom as TransitionElement);
      if (display && display !== 'none') { // todo TdCollapse can not open
        setDomStyle(element.dom as HTMLElement, 'display', display);
      } else {
        removeStyleProp(element,'display'); // todo optimize
      }
      transition.enter(element.dom as TransitionElement);
    } else {
      if (display && display !== 'none') { // todo TdCollapse can not open
       setDomStyle(element.dom as HTMLElement, 'display', display);
      } else {
        removeStyleProp(element, 'display'); // todo optimize
      }
    }
  } else {
    if (element.transition && oldValue) {
      // console.warn('element.transition is existed . ');
      element.transition.leave(element.dom as TransitionElement, () => {
        setDomStyle(element.dom as HTMLElement, 'display', 'none')
      });
    } else {
      setDomStyle(element.dom as HTMLElement, 'display', 'none');
    }
  }

}
