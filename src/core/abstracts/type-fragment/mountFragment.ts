import { isRef, unref } from '../../../reactivity';
import { Parser } from '../../../parser';
import { setCurrentInstance } from '../../component';
import { TypeFragment } from '../../abstracts/type-fragment/type-fragment.abstract';
import { listenEvents } from '../../event-emitter/event-emitter';
import { hasVIf, transformIf } from '../../transforms/vIf';
import { transformShow } from '../../transforms/vShow';
import { transformModel } from '../../transforms/vModel';
import { RendererElement } from '../../renderer/renderer';
import { mountChildren } from '../../renderer/mountChildren';
import { renderAnchor } from '../../renderer/anchor';
import { renderFragment } from '../../renderer/renderFragment';

export function mountFragment(element: TypeFragment, container: RendererElement) {
  // console.warn('mountElement .');
  if (element.dom instanceof Text || element.dom instanceof Comment) {
    console.error('element.dom is Text or Comment . ');
  }
  if (element.appContext?.config.globalProperties) {
    for (const key in element.appContext.config.globalProperties) {
      if (Object.prototype.hasOwnProperty.call(element.appContext.config.globalProperties, key)) {
        const value = element.appContext.config.globalProperties[key];
        (element as any)[key] = value;
      }
    }
  }
  // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34  就不应该有再次挂载的问题。
  // 如果在constructor 中添加了子节点，会导致子节点被清除了
  //    如果在setup 中有添加子节点，切换路由，会导致子节点被重复添加。
  // element.clearChildren(); // 空白了 todo why ???? 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。
  //   todo 有了 anchor 后， 这一步要重新写；setup中添加的节点不需要清理和重新添加了。
  setCurrentInstance(element); // todo watch 优化 props.vIf的监听
  element.params.setup?.bind(element)(element.props);
  if (element?.setup) {
    // 基础组件没有setup
    if (element.isRendered) {
      // todo 优化 如何注释了会有什么影响
      // throw new Error('element has rendered , should not setup again . ') // 在 ui-doc 中没有打印错误。
      console.error('element has rendered , should not setup again . ');
      // todo dialog appendToBody: true  transition.childNode TdOverlay is deleted.
      //   how to refine
      if (
        element.className !== 'Transition' &&
        element.className !== 'Teleport'
      ) {
        element.clearSetupChildren(); // 在setup 中添加的子节点， 清理监听事件 element.clearEvents()
      }
    }
    // element.clearEvents(); // useMount可能会反复使用；TdMessage 无法弹出 add by me 2025/06/12 16:21
    element.setup?.(element.props);
  }
  setCurrentInstance(element);
  element.created();

  if (element.props?.init) {
    element.props.init.bind(element)();
  }
  if (element.props?.html) {
    if (element.props?.html) {
      const parser = new Parser();
      const xElement = parser.parseFromString(unref(element.props.html)!);
      element.addChild?.(xElement);
    }
  }

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
  if (isRef(element.props?.refDom)) {
    // 语义更明确
    element.props.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
  }
  if (isRef(element.props?.refEl)) {
    element.props.refEl.set(element);
  }

  setCurrentInstance(element);
  element.beforeMount();

  // fragment也会创建dom；element.dom不会为空
  // element.render(); // setStyleObj, setAttrObj
  setCurrentInstance(element); // todo watch 优化 props.vIf的监听
  // dialog 弹框需要点一下才出来；
  transformIf(element, container); // drawer 弹框的头部关闭按钮显示到前面了。原因时 useVIf 在子节点mount前执行的，会导致useRecurseRender执行时找不到对应的子节点， 移除useVIf中useRecurseRender。
  transformShow(element);
  transformModel(element);
  // if (element.className === 'TdPopperContent') {
  //   console.warn('element is TdPopperContent . ');
  // }
  // todo 是否需要根据 vIf 的值拦截 子元素加载 ？？？
  // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
  // if (unref(element?.props?.vIf)) { // todo error 不显示页面了。 add by me 2025/08/29 16:28
  mountChildren(element);
  // }

  // fragment也会创建dom；element.dom不会为空
  // 要先添加子组件；再渲染当前组件；
  element.render(); // setStyleObj, setAttrObj

  // useVIf(element, appEl); // ImageView 预览不显示；
  // useVIf(element); // TdRate 只读 3.7 的0.7 没有渲染；
  // useVShow(element);
  // useVModel(element);
  // todo 要考虑 appEl 或 Element 是 DocumentFragment 的情景
  if (container && element.dom) {
    // 不能放到 处理子节点的前面， dialog弹框无法弹出
    element.parentDom = container;
    // 如果注释了， drawer body会跑到footer下面； messagebox的title会不渲染；
    //   原因时， useIf的watch不是立即执行的。
    //   todo 注释后， menu 子菜单没渲染 useVIf 在 子组件加载前执行了。
    //       todo 与 useRawVIf
    if (hasVIf(element)) {
      // todo 是否于上的useVIf重复了？
      // console.error('element.props.vIf is ', element.props.vIf);
      const parentNode = element.anchor?.parentNode;
      if (parentNode) {
        console.error('parentNode is ...... ', parentNode);
      }
      const condition = unref(element.props?.vIf);
      if (condition) {
        // true
        // console.error('element.props.vIf is  true');
        // insertDomAndAnchor(element, appEl); // todo ？？？
        renderFragment(element, container); // 真实dom上渲染；
      } else {
        // vIf is false or undefined
        // console.warn('element.props.vIf is false or undefined . ');
          // dom.childNodes 此时不为空。
          // 加到 DocumentFragment，只要没有appendChild到上级真实dom，都不会渲染的；
          renderAnchor(element, container);
          if (element.className === 'Teleport') {
            // todo targetAnchor
            console.error('element is Teleport');
          }
      }
    } else {
      // no vIf
      // console.error('element.dom is DocumentFragment . ');
      renderFragment(element, container);
    }
  }
  // 挂载后，再设置refDom,因为可能在挂载前，refDom被设置。
  // if (isRef(element.props.refDom)) { // 语义更明确
  //   element.props.refDom.set(element.dom); // todo 如果 element.dom 是 DocumentFragment, 有什么影响 ？
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
