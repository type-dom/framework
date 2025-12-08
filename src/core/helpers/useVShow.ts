import { setDomStyle } from '@type-dom/utils';
import { isRef, MaybeRef, unref, watch } from '../../reactivity';
import { removeStyleProp } from '../../dom/modules/style/style';
import { TransitionElement } from '../components/type-transition/type-transition.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { vShow, VShowElement, vShowOriginalDisplay } from './vShow';

export function useVShow(element: TypeNode) {
  if (Object.prototype.hasOwnProperty.call(element.$options, 'vShow')) {
    // console.warn('element.$options has vShow');
    const condition: MaybeRef<boolean | unknown> = element.$options.vShow;
    vShow(element, unref(condition));
    if (isRef(condition)) {
      // if (element.className === 'TdScrollbar') {
      //   console.warn('this.$options.vShow is ', condition);
      // }
      // 添加 监听 todo watch 有问题；
      //    todo 要触发 updated 才生效
      watch(() => condition.get(), (newValue, oldValue) => {
        // console.warn('newValue', newValue);
        useRawVShow(!!newValue, element, oldValue); // newValue is undefine时，要赋值 false
        // showUpdate(element, newValue, oldValue);
      }, {
        immediate: true
      })
    } else {
      // when this element mount , should useShow
      useRawVShow(condition, element);
      // vShow(element, condition)
    }
  }
}

function useRawVShow(condition: boolean | unknown, element: TypeNode, oldValue?: unknown) {
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
