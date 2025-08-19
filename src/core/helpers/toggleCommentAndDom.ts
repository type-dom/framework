import { isDescendant } from '@type-dom/utils';
import { TypeNode } from '../type-node/type-node.abstract';
import { RawDom } from '../type-element/type-element.interface';
import { mountDom } from './mountDom';
/**
 * 处理元素的注释占位符初始化及DOM替换逻辑
 * @param element 待处理的元素对象，包含DOM节点及关联的注释节点
 * @param upDom
 * @returns void
 */

// } else if (unref(element.baseProps.vIf) === false) {
//   // 如果this.dom已经被在其它地方加载了，会在这里被移除的。
//   // 所以同一对象被VIf多处使用时，会被移除。
//   // element.removeDom(); // todo mount时可以不处理吗？ 默认应该时没有被挂载的，有问题的还是一个对象多处判断。

export function replaceDomWithComment(element: TypeNode, upDom?: RawDom) {
  const dom = element.dom;
  // 真实父节点
  const parentElement = upDom ?? mountDom(element);
  // anchor和dom不能同时存在
  if (parentElement && element.dom && element.anchor &&
    isDescendant(parentElement, element.dom) && isDescendant(parentElement, element.anchor)) {
    console.error('parentElement has element.dom and element.anchor ');
  }
  /**
   * 确保元素拥有注释节点作为占位符（用于v-if等条件渲染指令）
   * 当element.anchor不存在时创建新的注释节点
   */
  element.anchor = element.anchor ?? document.createComment('v-if');

  /**
   * 核心DOM更新逻辑：
   * 如果元素的DOM节点是应用容器的后代：
   * 1. 使用注释节点替换原有DOM节点（保留位置但移除实际元素）
   * 否则：
   * 2. 将注释节点直接添加到应用容器作为子节点
   * 作用：实现条件渲染的占位符管理，保持DOM结构稳定
   */
  if (dom && parentElement) {
    // 如果 dom 存在且 parentElement 存在，尝试替换
    try {
      if (isDescendant(parentElement, dom)) {
        parentElement.replaceChild(element.anchor, dom);
      } else if (!isDescendant(parentElement, element.anchor)) {
        parentElement.appendChild(element.anchor)
      }
    } catch (error) {
      console.warn('parentElement.replaceChild error is ', error);
      // 如果 dom 已被移除，replaceChild 会失败，此时尝试 appendChild
      if (!isDescendant(parentElement, element.anchor)) parentElement.appendChild(element.anchor);
    }
  } else if (!dom && parentElement) {
    // 如果 dom 不存在但 parentElement 存在，直接 appendChild
    if (!isDescendant(parentElement, element.anchor)) parentElement.appendChild(element.anchor);
  }
}

// todo 先判断子节点中是否已经包含 element.dom
/**
 * mount/vIf 中调用
 * mount 时， 判断 props.vIf为true时， 创建 element.dom， 并替换注释节点
 * 首次挂载时， 创建 element.dom，appendChild element.dom
 * 再次挂载时， 替换注释节点
 * todo  Fragment  anchor占位，dom挂载后内容是空的，如果dom要存在内容，需要把子节点再挂载上来。
 * @param element
 * @param upDom
 */
export function replaceCommentWithDom(element: TypeNode, upDom?: RawDom | null) {
  upDom = upDom ?? mountDom(element);
  if (!upDom) return;
  // if (element.dom && isDescendant(upDom, element.dom) && element.anchor && isDescendant(upDom, element.anchor)) {
  //   console.error('upDom has element.dom and element.anchor ');
  // }

  if (element.dom && isDescendant(upDom, element.dom)) return;
  // todo 先判断子节点中是否已经包含 element.dom
  if (element.anchor && element.dom && isDescendant(upDom, element.anchor) && !isDescendant(upDom, element.dom)) {
    // 应该在 mount 中创建，并添加
    upDom?.replaceChild(element.dom, element.anchor);
  } else {
    if (element.dom && !isDescendant(upDom, element.dom)) upDom?.appendChild(element.dom);
  }
}
