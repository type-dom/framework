import { unref } from '../../reactivity';
import { LifecycleHooks } from '../enums';
import { TypeEl } from '../type-element/type-element.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { insertDomAndAnchor, anchorReplaceDom } from './anchorAndDom';
import { getToDom } from './mountDom';
import { resetDom } from './resetDom';

/**
 * 更新元素
 *
 * 递归渲染元素本身及所有后代元素
 * dom树的结构是自上而下的。
 * 渲染时，要反过来，要自下而上的渲染。
 * 主要是 useVIf 时用到。
 * 此函数负责渲染给定的元素，并递归地渲染其子节点。它会根据子节点的类型和属性来决定是否渲染该子节点，
 * 以及如何将其添加到DOM树中。这是为了支持条件渲染和动态组件展示。
 *
 * @param element 要渲染的 TypeNode 实例。
 * @param el
 */
export function useUpdate(element: TypeNode, el?: TypeEl): void {
  // console.warn('then update element.className is ' + element.className);
  if (!element) {
    console.error('element does not exist . ');
    return;
  }

  element.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((cb) => cb());
  resetDom(element);

  let appEl: Exclude<TypeEl, string>;
  if (
    element?.to // 显式验证 to 属性存在且为真值
    && !(
      element.className === 'TdTeleport'   // todo why ?
      && Boolean(unref(element.baseProps.disabled))
    )
  ) {
    appEl = getToDom(element);
  } else if (typeof el === 'string') {
    appEl = document.querySelector<HTMLElement>(el);
  } else if (el) { // todo maybe Document, etc.
    appEl = el;
  }
  // fragment也会创建dom；element.dom不会为空
  element.render(); // setStyleObj, setAttrObj

  // todo 要考虑 appEl 或 element.dom 是 DocumentFragment 的情景
  if (appEl && element.dom) { // 不能放到 处理子节点的前面， dialog弹框无法弹出
    // 如果注释了， drawer body会跑到footer下面； messagebox的title会不渲染；
    //   原因时， useIf的watch不是立即执行的。
    //   todo 注释后， menu 子菜单没渲染 useVIf 在 子组件加载前执行了。
    if (Object.hasOwnProperty.call(element.baseProps, 'vIf')) { // todo 是否于上的useVIf重复了？
      // console.error('element.baseProps.vIf is ', element.baseProps.vIf);
      if (unref(element.baseProps.vIf)) {
        // console.error('element.baseProps.vIf is  true');
        insertDomAndAnchor(element, appEl); // todo ？？？
      } else {
        anchorReplaceDom(element, appEl);
      }
    } else {
      appEl.appendChild(element.dom);
    }
  }
  element.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
}
