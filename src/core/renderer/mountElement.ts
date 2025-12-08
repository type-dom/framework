import { isDescendant } from '@type-dom/utils';
import { isRef, unref } from '../../reactivity';
import { Parser } from '../../parser';
import { setCurrentInstance } from '../component';
import { listenEvents } from '../event-emitter/event-emitter';
import { TypeNode } from '../type-node/type-node.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { useVIf } from '../helpers/useVIf';
import { useVShow } from '../helpers/useVShow';
import { useVModel } from '../helpers/useVModel';
import { getToDom } from '../helpers/mountDom';
import { createDom } from '../helpers/createDom';
import { processFragment } from './processFragment';
import { processElement } from './processElement';
import { RendererElement } from './renderer';

export function mountElement<T extends TypeElement>(element: T, container?: RendererElement) {
  const $node = container?.$node;
  if ($node) {
    if (element !== $node) {
      $node.unmount();
      container.$node = element;
    }
  } else {
    // container.$node = element;
  }
  // console.warn('mountElement .');
  if (element.dom instanceof Text || element.dom instanceof Comment) {
    console.error('element.dom is Text or Comment . ');
    return;
  }
  setCurrentInstance(element);
  element.created();
    // if (el instanceof DocumentFragment) {
    //   console.error('useMount el is DocumentFragment . ');
    // } else {
    //   console.error('el is not DocumentFragment, and is ', el);
    // }
    // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34  就不应该有再次挂载的问题。
    // 如果在constructor 中添加了子节点，会导致子节点被清除了
    //    如果在setup 中有添加子节点，切换路由，会导致子节点被重复添加。
    // element.clearChildren(); // 空白了 todo why ???? 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。
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
      element.setup?.(element.props);
    }
    // element.recurseSetup(); // 挂载时，递归执行setup

  if (element.$options.init) {
    element.$options.init(element);
  }
  if (element.$options.html) {
    if (element.$options?.html) {
      const parser = new Parser();
      const xElement = parser.parseFromString(unref(element.$options.html)!);
      element.addChild?.(xElement);
    }
  }
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
    if (isRef(element.$options.refDom)) { // 语义更明确
      element.$options.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
    }
    if (isRef(element.$options.refEl)) {
      element.$options.refEl.set(element);
    }

    let appEl: RendererElement | undefined | null;
    if (
      element?.to // 显式验证 to 属性存在且为真值
      && !(
        element.className === 'TdTeleport'   // TdTeleport 为 disabled 时，不转向挂载
        && Boolean(unref(element.$options.disabled))
      )
    ) {
      // Teleport 初次加载时，会找不到绑定的对象；
      appEl = getToDom(element) || (container as RendererElement);
    } else if (typeof container === 'string') {
      appEl = document.querySelector<HTMLElement>(container);
    } else if (container) { // todo maybe Document, etc.
      appEl = container;
    }

    // if (appEl instanceof DocumentFragment) {
    //   console.warn('appEl is DocumentFragment . ');
    // } else {
    //   console.warn('appEl is not DocumentFragment , and is ', appEl);
    // }

    setCurrentInstance(element);
    element.beforeMount();

    // fragment也会创建dom；element.dom不会为空
    // element.render(); // setStyleObj, setAttrObj
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
  // if (unref(element?.$options?.vIf)) { // todo error 不显示页面了。 add by me 2025/08/29 16:28
    for (const child of (element.childNodes ?? [])) {
      // if (element.dom instanceof DocumentFragment) { // todo 这样 TdButton 会多出一个 空 icon 图标；
      //   child.mount(appEl); // mount 时，不应该直接挂载到 上级真实dom， 而应该添加到 fragment的dom中。
      // } else {
      if (child.className === 'Teleport') {
          element.dom?.appendChild(child.anchorStart!);
          element.dom?.appendChild(child.anchor!);
      }
      // todo vIf vElse 的情况；
      const to = getToDom(child); // 这样不是挂载到跳转的dom上了吗？
      child.mount(to ?? element.dom); // 不需要了。 child 不会是在多个组件中。
      // if (Object.hasOwnProperty.call(element.$options, 'vIf')) {
      //   if (unref(element.$options.vIf)) {
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

  // fragment也会创建dom；element.dom不会为空
  // 要先添加子组件；再渲染当前组件；
  element.render(); // setStyleObj, setAttrObj

    // useVIf(element, appEl); // ImageView 预览不显示；
    // useVIf(element); // TdRate 只读 3.7 的0.7 没有渲染；
    // useVShow(element);
    // useVModel(element);
    // todo 要考虑 appEl 或 Element 是 DocumentFragment 的情景
    if (appEl && element.dom) { // 不能放到 处理子节点的前面， dialog弹框无法弹出
      element.parentDom = appEl;
      // 如果注释了， drawer body会跑到footer下面； messagebox的title会不渲染；
      //   原因时， useIf的watch不是立即执行的。
      //   todo 注释后， menu 子菜单没渲染 useVIf 在 子组件加载前执行了。
      //       todo 与 useRawVIf
      if (Object.hasOwnProperty.call(element.$options, 'vIf')) {
        // todo 是否于上的useVIf重复了？
        // console.error('element.$options.vIf is ', element.$options.vIf);
        const condition = unref(element.$options.vIf);
        if (condition) {
          // console.error('element.$options.vIf is  true');
          // insertDomAndAnchor(element, appEl); // todo ？？？
          if (element.dom instanceof DocumentFragment) {
            processFragment(element, appEl); // 真实dom上渲染；
          } else {
            processElement(element, appEl);
            replaceAnchorWithDom(element, appEl);
            // appEl.appendChild(element.dom);
          }
        } else {
          // console.warn('element.$options.vIf is false or undefined . ');
          if (element.dom instanceof DocumentFragment) { // dom.childNodes 此时不为空。
            // setFragmentAnchorWithoutDom(element, appEl); // 加到 DocumentFragment，值要没有appendChild到上级真实dom，都不会渲染的；
            element.anchorStart = element.anchorStart ?? document.createComment('[' + element.className);
            if (!isDescendant(appEl, element.anchorStart)) {
              appEl.appendChild(element.anchorStart);
            }
            //   todo tooltip， 会挂载提示内容，没有删除。所以还是要 removeDom。
            //      sub-menu 切换是 子菜单 collapse 切换加载会跑到上面。
            element.anchor = element.anchor ?? document.createComment(element.className + ']');
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
            processElement(element, appEl);
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
          processFragment(element, appEl);
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
    // if (isRef(element.$options.refDom)) { // 语义更明确
    //   element.$options.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
    // }
    setCurrentInstance(element); // todo watch 优化 props.vIf的监听
    element.mounted();
    element.isMounted = true;
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    element.initEvents?.();
    listenEvents(element);

    setCurrentInstance(null);

    return element;
}

/**
 * vIf 的值是 false | undefined 时， 会删除所有子节点的dom，这时，删除的dom需要添加锚点，以便恢复时定位。
 * 此时 Fragment 的dom 的childNodes 还没有被挂载出去不会删除。子元素的子元素呢？？？
 * todo
 * @param element
 * @param appEl
 */
export function clearDescendantDom(element: TypeNode, appEl: RendererElement) {
  const dom = createDom(element);
  if (dom) {
    if (dom instanceof DocumentFragment) {
      element.childNodes?.forEach((child) => {
        if (child.dom instanceof DocumentFragment) {
          // setFragmentAnchorWithoutDom(child, appEl);
          clearDescendantDom(child, dom);
        } else {
          processElement(child, dom);
          replaceAnchorWithDom(child, dom)
        }
      })
    } else {
      processElement(element, appEl);
      dom.remove();
    }
  }
}

// } else if (unref(element.$options.vIf) === false) {
//   // 如果this.dom已经被在其它地方加载了，会在这里被移除的。
//   // 所以同一对象被VIf多处使用时，会被移除。
//   // element.removeDom(); // todo mount时可以不处理吗？ 默认应该时没有被挂载的，有问题的还是一个对象多处判断。

export function replaceAnchorWithDom(element: TypeNode, upDom: RendererElement) {
  if (element.dom && element.anchor) {
    if (isDescendant(upDom, element.anchor)) {
      // console.error('element.anchor is descendant in upDom, it is error');
      upDom.replaceChild(element.dom, element.anchor);
    }
  } else {
    console.error('dom or element.anchor is undefined . ')
  }
}
