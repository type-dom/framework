import { isRef, unref } from '../../reactivity';
import { LifecycleHooks } from '../enums';
import { setCurrentInstance } from '../component';
import { listenEvents } from '../event-emitter/event-emitter';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeEl } from '../type-element/type-element.interface';
import { useVIf } from './useVIf';
import { useVShow } from './useVShow';
import { useVModel } from './useVModel';
import { getToDom } from './mountDom';
import { replaceCommentWithDom, replaceDomWithComment } from './toggleCommentAndDom';
import { createDom } from './createDom';

export function useMount<T extends TypeElement>(element: T, el?: TypeEl) {
  // console.warn('mount .');
  // if (el instanceof DocumentFragment) {
  //   console.error('useMount el is DocumentFragment . ');
  // } else {
  //   console.error('el is not DocumentFragment, and is ', el);
  // }
  // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34
  // 如果在constructor 中添加了子节点，会导致子节点被清除了
  //    如果在setup 中有添加子节点，切换路由，会导致子节点被重复添加。
  // element.clearChildren(); // 空白了 todo why ???? 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。 useParams
  if (element.setup) { // 基础组件没有setup
    if (element.rendered) {
      element.clearSetupChildren(); // 在setup 中添加的子节点， 清理监听事件 element.clearEvents()
    }
    // element.clearEvents(); // useMount可能会反复使用；TdMessage 无法弹出 add by me 2025/06/12 16:21
    setCurrentInstance(element); // todo watch 优化 props.vIf的监听
    element.setup?.();
  }
  setCurrentInstance(element);
  element.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
  // element.recurseSetup(); // 挂载时，递归执行setup

  createDom(element);

  // useVIf(element);
  // useVShow(element);
  // useVModel(element);

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
  if (isRef(element.baseProps.refDom)) { // 语义更明确
    element.baseProps.refDom.set(element.dom as  HTMLElement | SVGElement | DocumentFragment); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
  }
  if (isRef(element.baseProps.refEl)) {
    element.baseProps.refEl.set(element);
  }

  let appEl: Exclude<TypeEl, string>;
  if (
    element?.to // 显式验证 to 属性存在且为真值
    && !(
      element.className === 'TdTeleport'
      && Boolean(unref(element.baseProps.disabled))
    )
  ) {
    appEl = getToDom(element);
  } else if (typeof el === 'string') {
    appEl = document.querySelector<HTMLElement>(el);
  } else if (el) { // todo maybe Document, etc.
    appEl = el;
  }

  // if (appEl instanceof DocumentFragment) {
  //   console.warn('appEl is DocumentFragment . ');
  // } else {
  //   console.warn('appEl is not DocumentFragment , and is ', appEl);
  // }

  setCurrentInstance(element);
  element.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());

  // fragment也会创建dom；element.dom不会为空
  element.render(); // setStyleObj, setAttrObj
  setCurrentInstance(element); // todo watch 优化 props.vIf的监听
  // useVIf(element, appEl); // dialog 弹框需要点一下才出来；
  useVIf(element); // drawer 弹框的头部关闭按钮显示到前面了。原因时 useVIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点， 移除useVIf中useRecurseRender。
  useVShow(element);
  useVModel(element);

  // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
  for (const child of element.children) {
    // if (element.dom instanceof DocumentFragment) { // todo 这样 TdButton 会多出一个 空 icon 图标；
    //   child.mount(appEl);
    // } else {
      child.mount(element.dom);
    // }
  }

  // useVIf(element, appEl); // ImageView 预览不显示；
  // useVIf(element); // TdRate 只读 3.7 的0.7 没有渲染；
  // useVShow(element);
  // useVModel(element);
  // todo 要考虑 appEl 或 element.dom 是 DocumentFragment 的情景
  if (appEl && element.dom) { // 不能放到 处理子节点的前面， dialog弹框无法弹出
    // 如果注释了， drawer body会跑到footer下面； messagebox的title会不渲染；
    //   原因时， useIf的watch不是立即执行的。
    //   todo 注释后， menu 子菜单没渲染 useVIf 在 子组件加载前执行了。
    if (Object.hasOwnProperty.call(element.baseProps, 'vIf')) { // todo 是否于上的useVIf重复了？
      // console.error('element.baseProps.vIf is ', element.baseProps.vIf);
      if (unref(element.baseProps.vIf)) {
        // console.error('element.baseProps.vIf is  true');
        replaceCommentWithDom(element, appEl); // todo ？？？
      } else {
        replaceDomWithComment(element, appEl);
      }
    } else {
      if (element.dom instanceof DocumentFragment) {
        // console.error('element.dom is DocumentFragment . ');
        /**
         *  添加 定位锚点
         * 确保元素拥有注释节点作为占位符）
         * 当element.anchor不存在时创建新的注释节点
         */
        // if (element.className === undefined) {
        //   console.error('element.className === undefined , element is ', element);
        // }
        // if (element.uid === 50) {
        //   console.error('element.uid === 50 , element is ', element);
        // }
        element.anchorStart = element.anchorStart ?? document.createComment('[--' + element.className + '' + element.uid);
        appEl.appendChild(element.anchorStart);
        appEl.appendChild(element.dom);
        element.anchor = element.anchor ?? document.createComment(element.className + '' + element.uid + '--]');
        appEl.appendChild(element.anchor);
      } else {
        appEl.appendChild(element.dom);
      }
    }
    // if (element.dom instanceof DocumentFragment) {
    //   console.error('element.dom is DocumentFragment . ');
    //   /**
    //    *  添加 定位锚点
    //    * 确保元素拥有注释节点作为占位符）
    //    * 当element.anchor不存在时创建新的注释节点
    //    */
    //   element.anchor = element.anchor ?? document.createComment('fragment-' + element.className);
    //   appEl.appendChild(element.anchor);
    // }
  }
  // 挂载后，再设置refDom,因为可能在挂载前，refDom被设置。
  // if (isRef(element.baseProps.refDom)) { // 语义更明确
  //   element.baseProps.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
  // }
  setCurrentInstance(element); // todo watch 优化 props.vIf的监听
  element.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
  // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
  element.initEvents?.();
  listenEvents(element);

  setCurrentInstance(null);

  return element as unknown as T;
}
