import { toRaw } from '../../reactivity';
import { LifecycleHooks } from '../enums';
import { TypeElement } from './type-element.abstract';
import { ElProp } from './type-element.interface';
import { replaceCommentWithDom, replaceDomWithComment } from './util';

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
 * @param element 要渲染的TypeElement实例。
 */
export function useUpdate(element: TypeElement, el?: ElProp): void {
  // console.warn('then update element.className is ' + element.className);
  if (!element) {
    console.error('element does not exist . ');
    return;
  }

  element.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((cb) => cb());
  element.createDom();
  for (const child of element.children) {
    if (child instanceof TypeElement) {
      // props.vIf存在，且不为true时，不渲染。
      if (Object.hasOwnProperty.call(child.props, 'vIf')) {
        if (toRaw(child.props.vIf)) {
          replaceCommentWithDom(child);
          useUpdate(child);
        } else {
          replaceDomWithComment(child);
        }
      } else {
        useUpdate(child);
      }
    } else {
      console.warn('child is not TypeElement and TextNode, but is ', child);
      child.render();
    }
  }
  element.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
}
