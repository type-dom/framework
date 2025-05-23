import { toRaw } from '@type-dom/signals';
import { TypeElement } from './type-element.abstract';
import { mountDom } from './mountDom';

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
      if (Object.hasOwnProperty.call(child.props, 'vIf')) {
        if (toRaw(child.props.vIf)) {
          useRecurseRender(child);
        } else {
          child.removeDom();
        }
      } else {
        useRecurseRender(child);
      }
    } else {
      child.render();
    }
    // const upDom = mountDom(element); // todo dialog error
    const upDom = mountDom(child); // todo repeat loop; now may be right;
    // 无法合并到上面的代码中
    // 处理vIf属性，决定是否将子节点添加到DOM树中。
    if (Object.hasOwnProperty.call(child.props, 'vIf')) {
      // if (toRaw(child.props.vIf) !== false) { // TdMessageBox 弹不出来
      if (toRaw(child.props.vIf)) {
        upDom?.appendChild(child.dom!);
      } else {
        child.removeDom();
      }
    } else {
      upDom?.appendChild(child.dom!);
    }

    // 注：  vShow 本身不改变dom树的结构，是否显示由 props.vShow 决定。
  })
}
