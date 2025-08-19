import { isRef, MaybeRef, unref, watch } from '../../reactivity';
import { vShow, VShowElement, vShowOriginalDisplay } from '../../dom/directives/vShow';
import { TransitionElement } from '../components/type-transition/type-transition.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { removeStyleProp, setStyleObj } from '../../dom/modules/style/style';

export function useVShow(element: TypeElement) {
  if (Object.prototype.hasOwnProperty.call(element.baseProps, 'vShow')) {
    // console.warn('element.baseProps has vShow');
    const condition: MaybeRef<boolean | unknown> = element.baseProps.vShow;
    vShow(element, unref(condition));
    if (isRef(condition)) {
      // if (element.className === 'TdScrollbar') {
      //   console.warn('this.baseProps.vShow is ', condition);
      // }
      // 添加 监听 todo watch 有问题；
      //    todo 要触发 updated 才生效
      watch(() => condition.get(), (newValue, oldValue) => {
        // console.warn('newValue', newValue);
        useRawVShow(newValue, element, oldValue);
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

function useRawVShow(condition: boolean | unknown, element: TypeElement, oldValue?: unknown) {
  const display =  (element.dom as VShowElement)[vShowOriginalDisplay];
  const transition = element.transition;
  if (condition) {
    // display = element.style?.get('display') as string ?? display;
    if (transition) {
      // console.warn('element.transition is existed . ');
      // 注： 现在这样必须 vShow绑定真实dom才有意义，fragment 的vShow没有意义。
      transition.beforeEnter(element.dom as TransitionElement);
      if (display && display !== 'none') { // todo TdCollapse can not open
        setStyleObj(element,{
          display: display,
        });
      } else {
        removeStyleProp(element,'display'); // todo optimize
      }
      transition.enter(element.dom as TransitionElement);
    } else {
      if (display && display !== 'none') { // todo TdCollapse can not open
       setStyleObj(element, {
          display: display,
        });
      } else {
        removeStyleProp(element, 'display'); // todo optimize
      }
    }
  } else {
    if (element.transition && oldValue) {
      // console.warn('element.transition is existed . ');
      element.transition.leave(element.dom as TransitionElement, () => {
        setStyleObj(element, {
          display: 'none',
        });
      });
    } else {
      setStyleObj(element, {
        display: 'none',
      });
    }
  }

}
