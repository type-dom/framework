import { toRaw } from '../../reactivity';
import { TypeElement } from '../type-element/type-element.abstract';
import { insertDomAndAnchor, anchorReplaceDom } from './anchorAndDom';

/**
 * 递归渲染元素本身及所有后代元素
 * dom树的结构是自上而下的。
 * 渲染时，要反过来，要自下而上的渲染。
 * 主要是 useVIf 时用到。
 * 此函数负责渲染给定的元素，并递归地渲染其子节点。它会根据子节点的类型和属性来决定是否渲染该子节点，
 * 以及如何将其添加到DOM树中。这是为了支持条件渲染和动态组件展示。
 *
 * @param element 要渲染的TypeElement实例。
 */
export function useRecurseRender(element: TypeElement) {
  // 渲染当前元素。
  element.render();

  // 遍历当前元素的所有子节点。
  element.childNodes.forEach(child => {
    // 检查子节点是否为TypeElement实例。
    if (child instanceof TypeElement) {
      // props.vIf存在，且不为true时，不渲染。
      useRecurseRender(child);
      if (Object.hasOwnProperty.call(child.baseProps, 'vIf')) {
        if (toRaw(child.baseProps.vIf)) {
          insertDomAndAnchor(child);
        } else {
          anchorReplaceDom(child);
        }
      }
    } else {
      child.render();
    }
  })
}
