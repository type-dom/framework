import { isDescendant } from "@type-dom/utils";
import { isRef, unref } from '../../reactivity';
import { LifecycleHooks } from '../enums';
import { setCurrentInstance } from '../component';
import { listenEvents } from '../event-emitter/event-emitter';
import { TypeElement } from '../type-element/type-element.abstract';
import { RawDom, TypeEl } from '../type-element/type-element.interface';
import { useVIf } from './useVIf';
import { useVShow } from './useVShow';
import { useVModel } from './useVModel';
import { getToDom } from './mountDom';
import {
  setFragmentAnchorWithDom,
  setElementAnchor,
  replaceElementAnchorWithDom,
  // setFragmentAnchorWithoutDom,
} from './anchorAndDom';
import { createDom } from './createDom';
// import { removeDom } from './removeDom';
import { TypeNode } from '../type-node/type-node.abstract';

/**
 *
 * @param element
 * @param el
 */
export function mountElement<T extends TypeElement>(element: T, el?: RawDom | string) {
  // console.warn('mountElement .');
  if (element.dom instanceof Text || element.dom instanceof Comment) {
    console.error('element.dom is Text or Comment . ');
    return;
  }
    // if (el instanceof DocumentFragment) {
    //   console.error('useMount el is DocumentFragment . ');
    // } else {
    //   console.error('el is not DocumentFragment, and is ', el);
    // }
    // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34  就不应该有再次挂载的问题。
    // 如果在constructor 中添加了子节点，会导致子节点被清除了
    //    如果在setup 中有添加子节点，切换路由，会导致子节点被重复添加。
    // element.clearChildren(); // 空白了 todo why ???? 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。 useParams
  //   todo 有了 anchor 后， 这一步要重新写；setup中添加的节点不需要清理和重新添加了。
  if (element?.setup) { // 基础组件没有setup
      if (element.isRendered) {
        // throw new Error('element has rendered , should not setup again . ') // 在 ui-doc 中没有打印错误。
        console.error('element has rendered , should not setup again . ');
        element.clearSetupChildren(); // 在setup 中添加的子节点， 清理监听事件 element.clearEvents()
      }
      // const to = getToDom(element);
      // if (to) {
      //   console.error('to is ', to);
      // }
      // element.clearEvents(); // useMount可能会反复使用；TdMessage 无法弹出 add by me 2025/06/12 16:21
      setCurrentInstance(element); // todo watch 优化 props.vIf的监听
      element.setup?.();
    }
    setCurrentInstance(element);
    element.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
    // element.recurseSetup(); // 挂载时，递归执行setup

    const dom = createDom(element);

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
      element.baseProps.refDom.set(element.dom as RawDom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
    }
    if (isRef(element.baseProps.refEl)) {
      element.baseProps.refEl.set(element);
    }

    let appEl: RawDom | undefined | null;
    if (
      element?.to // 显式验证 to 属性存在且为真值
      && !(
        element.className === 'TdTeleport'   // TdTeleport 为 disabled 时，不转向挂载
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
    // if (element.className === 'TdPopperContent') {
    //   console.warn('element is TdPopperContent . ');
    // }
    // todo 是否需要根据 vIf 的值拦截 子元素加载 ？？？
    // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
  // if (unref(element?.baseProps?.vIf)) { // todo error 不显示页面了。 add by me 2025/08/29 16:28
    for (const child of (element.childNodes ?? [])) {
      // if (element.dom instanceof DocumentFragment) { // todo 这样 TdButton 会多出一个 空 icon 图标；
      //   child.mount(appEl); // mount 时，不应该直接挂载到 上级真实dom， 而应该添加到 fragment的dom中。
      // } else {
      // todo vIf vElse 的情况；
      const to = getToDom(child); // 这样不是挂载到跳转的dom上了吗？
      child.mount(to ?? element.dom as TypeEl); // 不需要了。 child 不会是在多个组件中。
      // if (Object.hasOwnProperty.call(element.baseProps, 'vIf')) {
      //   if (unref(element.baseProps.vIf)) {
      //     child.mount(to ?? element.dom as TypeEl);
      //   } else {
      //   //   todo nothing
      //   //       child 会没有 mounted
      //   //   child.mount(to ?? element.dom as TypeEl);
      //     //  应该添加占位 anchor , 不插入 child.dom
      //     if (child.props.nodeName === 'fragment') {
      //       // child 会 mounted， 而 child.childNode会没有 mounted  todo
      //       setFragmentAnchorWithoutDom(child, dom);
      //     } else {
      //       setElementAnchor(child, dom);
      //     }
      //   }
      // } else {
      //   // if (to) {
      //   //   console.error('to is ', to);
      //   // }
      //   // todo v-if v-else 时，如果两种情况下的slot引用了有一个传入的props.slot对象。
      //   //    v-else 中再挂载 props.slot对象，会导致v-if中的对象被转移了。
      //   child.mount(to ?? element.dom as TypeEl);
      //   // useMount(child, to ?? element.dom as TypeEl)
      //   // }
      // }
    }
  // }


    // useVIf(element, appEl); // ImageView 预览不显示；
    // useVIf(element); // TdRate 只读 3.7 的0.7 没有渲染；
    // useVShow(element);
    // useVModel(element);
    // todo 要考虑 appEl 或 Element 是 DocumentFragment 的情景
    if (appEl && element.dom) { // 不能放到 处理子节点的前面， dialog弹框无法弹出
      // 如果注释了， drawer body会跑到footer下面； messagebox的title会不渲染；
      //   原因时， useIf的watch不是立即执行的。
      //   todo 注释后， menu 子菜单没渲染 useVIf 在 子组件加载前执行了。
      //       todo 与 useRawVIf
      if (Object.hasOwnProperty.call(element.baseProps, 'vIf')) { // todo 是否于上的useVIf重复了？
        // console.error('element.baseProps.vIf is ', element.baseProps.vIf);
        const condition = unref(element.baseProps.vIf);
        if (condition) {
          // console.error('element.baseProps.vIf is  true');
          // insertDomAndAnchor(element, appEl); // todo ？？？
          if (element.dom instanceof DocumentFragment) {
            setFragmentAnchorWithDom(element, appEl); // 真实dom上渲染；
          } else {
            setElementAnchor(element, appEl);
            replaceElementAnchorWithDom(element, appEl);
            // appEl.appendChild(element.dom);
          }
        } else {
          if (element.dom instanceof DocumentFragment) { // dom.childNodes 此时不为空。
            // setFragmentAnchorWithoutDom(element, appEl); // 加到 DocumentFragment，值要没有appendChild到上级真实dom，都不会渲染的；
            element.anchorStart = element.anchorStart ?? document.createComment('[--' + element.className + '' + element.uid);
            if (!isDescendant(appEl, element.anchorStart)) {
              appEl.appendChild(element.anchorStart);
            }
            //   todo tooltip， 会挂载提示内容，没有删除。所以还是要 removeDom。
            //      sub-menu 切换是 子菜单 collapse 切换加载会跑到上面。
            element.anchor = element.anchor ?? document.createComment(element.className + '' + element.uid + '--]');
            if (!isDescendant(appEl, element.anchor)) {
              appEl.appendChild(element.anchor);
            }
            clearDescendantDom(element, appEl)
            // element.childNodes.forEach((child) => {
            //   if (child.dom instanceof DocumentFragment) {
            //   //   nothing 会自动添加锚点，anchor,anchorStart
            //     setFragmentAnchorWithoutDom(child, appEl);
            //   } else {
            //     setElementAnchor(child, appEl);
            //   }
            // })
            // // 也应该给删除的dom 添加 锚点
            // removeDom(element); // 这里不需要删除，因为 element.dom 是 DocumentFragment，不会被渲染到真实dom。
          } else {
            setElementAnchor(element, appEl);
          }
        }
      } else {
        if (element.dom instanceof DocumentFragment) {
          // console.error('element.dom is DocumentFragment . ');
          /**
           *  添加 定位锚点
           * 确保元素拥有注释节点作为占位符）
           * 当element.anchor不存在时创建新的注释节点
           */ /**
           *  添加 定位锚点
           * 确保元素拥有注释节点作为占位符）
           * 当element.anchor不存在时创建新的注释节点
           */
          setFragmentAnchorWithDom(element, appEl);
        } else {
          if (isDescendant(appEl, element.dom)) {
            // console.error('appEl has include element.dom')
          } else {
            // vIf vElse 时， element.anchor 可能会被创建了，只是没有 dom.childNodes；
            //   现在应该不会了。应该同一 props.slot 挂载的不同的组件时，会创建新的对象。
            if (element.anchor && isDescendant(appEl, element.anchor)) {
              // console.error('element.anchor is descendant in appEl, it is error');
              appEl.replaceChild(dom, element.anchor);
            } else {
              appEl.appendChild(element.dom);
            }
          }
        }
      }
    }
    // 挂载后，再设置refDom,因为可能在挂载前，refDom被设置。
    // if (isRef(element.baseProps.refDom)) { // 语义更明确
    //   element.baseProps.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
    // }
    setCurrentInstance(element); // todo watch 优化 props.vIf的监听
    element.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
    element.isMounted = true;
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    element.initEvents?.();
    listenEvents(element);

    setCurrentInstance(null);

    return element;
}

/**
 * vIf 的值是 false | undefined 时， 会删除所有子节点的dom，这是，删除的dom需要添加锚点，以便恢复时定位。
 * 此时 Fragment 的dom 的childNodes 还没有被挂载出去不会删除。子元素的子元素呢？？？
 * todo
 * @param element
 * @param appEl
 */
export function clearDescendantDom(element: TypeNode, appEl: Exclude<RawDom, Document>) {
  const dom = createDom(element);
  if (dom) {
    if (dom instanceof DocumentFragment) {
      element.childNodes?.forEach((child) => {
        if (child.dom instanceof DocumentFragment) {
          // setFragmentAnchorWithoutDom(child, appEl);
          clearDescendantDom(child, dom);
        } else {
          setElementAnchor(child, dom);
          replaceElementAnchorWithDom(child, dom)
        }
      })
    } else {
      setElementAnchor(element, appEl);
      dom.remove();
    }
  }
}
