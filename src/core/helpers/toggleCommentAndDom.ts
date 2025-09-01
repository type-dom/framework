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
  // console.error('upDom is ', upDom);
  const dom = element.dom;
  // 真实父节点
  // if (upDom instanceof DocumentFragment) {
  //   console.error('upDom is DocumentFragment . upDom is ', upDom);
  // }
  // if (element.dom instanceof DocumentFragment) {
  //   console.error('element.dom is DocumentFragment. element is ', element);
  // }
  const parentElement = upDom ?? mountDom(element);
  // anchor和dom不能同时存在
  // if (parentElement && element.dom && element.anchor &&
  //   isDescendant(parentElement, element.dom) && isDescendant(parentElement, element.anchor)) {
  //   console.error('parentElement has element.dom and element.anchor ');
  // }
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
      if (dom instanceof DocumentFragment) {
        element.childNodes?.forEach(child => {
          child.mount(dom as DocumentFragment);
        })
      } else if (isDescendant(parentElement, dom)) {
        parentElement.replaceChild(element.anchor, dom);
      } else if (!isDescendant(parentElement, element.anchor)) { // todo fragment 占位符 会一直保存。
        parentElement.appendChild(element.anchor);
      } else {
        console.warn('element.dom is not a child of parentElement');
        // if (parentElement instanceof DocumentFragment) {
        //   // const up = mountDom(element);
        //   if (element.dom instanceof DocumentFragment) {
        //     if (element.dom.childNodes.length > 0) {
        //       // up?.insertBefore(element.dom, element.anchor);
        //     } else {
        //       // useRecurseRender(element as TypeElement)
        //       element.mount(parentElement);
        //     }
        //   }
        // } else {
        //   // useRecurseRender(element as TypeElement)
        //   // element.mount(parentElement);
        //   if (element.dom instanceof DocumentFragment) {
        //     element.childNodes?.forEach(child => {
        //       child.mount(element.dom as DocumentFragment);
        //     })
        //   }
        // }
      }
    } catch (error) {
      console.error('parentElement.replaceChild error is ', error);
      // 如果 dom 已被移除，replaceChild 会失败，此时尝试 appendChild
      // todo fragment 占位符 会一直保存。
      if (!isDescendant(parentElement, element.anchor)) { // 如果 element.anchor 不在 parentElement 中，则尝试 appendChild
        parentElement.appendChild(element.anchor);
      }
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
 *   注： Fragment的 anchor占位，不能被替换，因为替换后是无法被找回的。
 * @param element
 * @param upDom
 */
export function replaceCommentWithDom(element: TypeNode, upDom?: RawDom | null) {
  // if (upDom instanceof DocumentFragment) {
  //   console.warn('upDom is DocumentFragment . upDom is ', upDom);
  // }
  // if (element.dom instanceof DocumentFragment) {
  //   console.warn('element.dom is DocumentFragment. element is ', element);
  // }
  upDom = upDom ?? mountDom(element);
  if (!upDom) return;
  // if (element.dom && isDescendant(upDom, element.dom) && element.anchor && isDescendant(upDom, element.anchor)) {
  //   console.error('upDom has element.dom and element.anchor ');
  // }
  const dom = element.dom;
  if (dom && isDescendant(upDom, dom)) return;
  // todo 先判断子节点中是否已经包含 element.dom
  if (element.anchor && dom && isDescendant(upDom, element.anchor) && !isDescendant(upDom, dom)) {
    // 应该在 mount 中创建，并添加
    if (dom instanceof DocumentFragment) {
      if (dom.childNodes.length > 0) {
      //   fragment.dom 有子元素
      } else {
        element.childNodes?.forEach(child => {
          child.mount(dom);
        })
      }
      upDom?.insertBefore(dom, element.anchor);
    } else {
      upDom?.replaceChild(dom, element.anchor);
    }
  } else {
    if (dom && !isDescendant(upDom, dom)){
      if (dom instanceof DocumentFragment) {
        // if (element.className === undefined) {
        //   console.error('element.className === undefined , element is ', element);
        // }
        // if (element.uid === 50) {
        //   console.error('element.uid === 50 , element is ', element);
        // }
        element.anchorStart = element.anchorStart ?? document.createComment('[--' + element.className + '' + element.uid);
        element.anchor = element.anchor ?? document.createComment(element.className + '' + element.uid + '--]');
        upDom.appendChild(element.anchorStart)
        upDom.appendChild(dom);
        upDom.appendChild(element.anchor);
      } else {
        upDom?.appendChild(dom);
      }
    }
  }
}
