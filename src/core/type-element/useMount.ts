import { isRef, unref } from '@type-dom/signals';
import { LifecycleHooks } from '../enums';
import { setCurrentInstance } from '../instance';
import { useVIf } from './useVIf';
import { useVShow } from './useVShow';
import { useVModel } from './useVModel';
import { TypeElement } from './type-element.abstract';
import { ElProp } from './type-element.interface';
import { getToDom } from './mountDom';

export function useMount<T extends TypeElement>(element: T, el?: ElProp) {
  // console.warn('mount .');
  // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34
  // 如果在constructor 中添加了子节点，会导致子节点被清除了
  //    如果在setup 中有添加子节点，切换路由，会导致子节点被重复添加。
  // element.clearChildren(); // 空白了 todo why ???? 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。 useParams
  element.clearSetupChildren(); //
  setCurrentInstance(element); // todo watch 优化 props.vIf的监听
  element.setup?.();

  useVIf(element);
  useVShow(element);
  useVModel(element);

  setCurrentInstance(null);

  element.created?.();
  element.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
  // element.recurseSetup(); // 挂载时，递归执行setup

  element.createDom();

  /**
   * 挂载时获取 dom，绑定到 ref 属性。
   *
   * 注： 在vuejs中如果 ref 被应用在一个原生 DOM 元素上：
   *      InputRef 最终会指向这个 DOM 元素。
   *      如果 ref 被应用在一个自定义组件上：
   *      InputRef 最终会指向这个组件实例，而不是组件的根 DOM 元素。
   *      如果你需要访问组件的根 DOM 元素，可以通过组件实例的 dom 属性来获取。
   *
   * 为了保持一致， 标记基础组件 区别 自定义组件，
   */
  if (isRef(element.props.refDom)) { // 语义更明确
    element.props.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
  }
  if (isRef(element.props.refEl)) {
    element.props.refEl.set(element);
  }

  let appEl: Exclude<ElProp, string>;
  if (
    element?.to // 显式验证 to 属性存在且为真值
    && !(
      element.className === 'TdTeleport'
      && Boolean(unref(element.props.disabled))
    )
  ) {
    appEl = getToDom(element);
  } else if (typeof el === 'string') {
    appEl = document.querySelector<HTMLElement>(el);
  } else if (el) { // todo maybe Document, etc.
    appEl = el;
  }
  element.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());
  element.beforeMount?.();
  // fragment也会创建dom；element.dom不会为空
  element.render(); // setStyleObj, setAttrObj
  // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
  for (const child of element.children) {
    child.mount(element.dom);
  }
  if (appEl && element.dom) {
    if (Object.hasOwnProperty.call(element.props, 'vIf')) {
      if (unref(element.props.vIf)) {
        appEl.appendChild(element.dom);
      } else {
        element.removeDom();
      }
    } else {
      appEl.appendChild(element.dom);
    }
  }
  element.mounted?.();
  // 挂载后，再设置refDom,因为可能在挂载前，refDom被设置。
  // if (isRef(element.props.refDom)) { // 语义更明确
  //   element.props.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
  // }
  element.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
  // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
  element.initEvents?.();
  element.listenEvents();
  return element as unknown as T;
}
