import { isDescendant } from '@type-dom/utils';
import { TypeNode } from '../type-node/type-node.abstract';
import { mountDom } from '../helpers/mountDom';
import { createDom } from '../helpers/createDom';
import { resetDom } from '../helpers/resetDom';
import { removeDom } from './removeDom';
// import { TypeElement } from '../type-element/type-element.abstract';
// import { UnmountFn } from './unmount';


export type ElementNamespace = 'svg' | 'mathml' | undefined


export type RealDom =  Element | ShadowRoot // HTMLElement | SVGElement | ShadowRoot; //
export type RawDom = RealDom | DocumentFragment | Document;
export type TypeEl =  RawDom | string | null | undefined;

// Renderer Node can technically be any object in the context of core renderer
// logic - they are never directly operated on and always passed to the node op
// functions provided via options, so the internal constraint is really just
// a generic object.
export type RendererNode = (RawDom | Comment | Text) & { $node?: TypeNode; [key: string | symbol]: any};

export type RendererElement = RendererNode;

// An object exposing the internals of a renderer, passed to tree-shakeable
// features so that they can be decoupled from this file. Keys are shortened
// to optimize bundle size.
// export interface RendererInternals<
//   HostNode = RendererNode,
//   HostElement = RendererElement,
// > {
//   p: PatchFn
//   um: UnmountFn
//   r: RemoveFn
//   m: MoveFn
//   mt: MountComponentFn
//   mc: MountChildrenFn
//   pc: PatchChildrenFn
//   pbc: PatchBlockChildrenFn
//   n: NextFn
//   o: RendererOptions<HostNode, HostElement>
// }

export function anchorReplaceDom(element: TypeNode, container?: RendererElement) {
  // console.error('anchorReplaceDom ， upDom is ', upDom);
  const dom = element.dom;
  // 真实父节点
  // if (upDom instanceof DocumentFragment) {
  //   console.error('upDom is DocumentFragment . upDom is ', upDom);
  // }
  // if (element.dom instanceof DocumentFragment) {
  //   console.error('element.dom is DocumentFragment. element is ', element);
  // }
  const parentElement = container ?? mountDom(element);
  /**
   * 确保元素拥有注释节点作为占位符（用于v-if等条件渲染指令）
   * 当element.anchor不存在时创建新的注释节点
   */
  // if (element instanceof TypeFragment) {
  //   element.anchorStart = element.anchorStart ?? document.createComment('[' + element.className + element.uid);
  //   element.anchor = element.anchor ?? document.createComment(element.className + element.uid + ']');
  // } else {
  //   element.anchor = element.anchor ?? document.createComment('v-if ' + element.className + element.uid);
  // }

  if (!element.anchor) {
    console.error('element.anchor or element.anchorStart is undefined . ');
    return;
  }
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
      // console.error('parentElement is ', parentElement);
      // if (dom instanceof DocumentFragment) {
      //   resetDom(element); // 子节点都挂载到 DocumentFragment 上；
        // element.childNodes?.forEach(child => {
        //   child.mount(dom);
        // })
      // }
      if (dom instanceof DocumentFragment) {
        if (!element.anchorStart) {
          console.error('element.anchor or element.anchorStart is undefined . ');
          return;
        }
        if (!isDescendant(parentElement, element.anchor)) {
          console.error('element.anchor is not in parentElement . ');
          return;
        }
        // removeNodesBetween(parentElement, element.anchorStart, element.anchor);
        // todo 子节点如果有 Teleport to 的没有清理。
        removeDom(element);
      } else { // 普通子元素
        if (Object.prototype.hasOwnProperty.call(element.$options, 'vIf')) {
          if (isDescendant(parentElement, dom)) {
            parentElement.replaceChild(element.anchor, dom);
          } else {
            console.warn('dom is not in parentElement . ');
          }
        } else {
          console.error('parentElement has element.anchor . ');
        }
      }
      // if (element.anchorStart && !isDescendant(parentElement, element.anchorStart)) {
      //   parentElement.appendChild(element.anchorStart);
      // }
      // if (!isDescendant(parentElement, element.anchor)) { // todo fragment 占位符 会一直保存。
      //   console.error('parentElement does not has element.anchor . ');
      //   parentElement.appendChild(element.anchor);
      // }
      // if (isDescendant(parentElement, dom)) {
      //   parentElement.replaceChild(element.anchor, dom); // 要替换节点 todo 直接删除不好吗？
      // }
      // element.dom?.remove();
      // removeDom(element); // todo 不是只要不挂载就行了吗？
    } catch (error) {
      // console.error('parentElement.replaceChild error is ', error);
      // 如果 dom 已被移除，replaceChild 会失败，此时尝试 appendChild
      // todo fragment 占位符 会一直保存。
      if (!isDescendant(parentElement, element.anchor)) { // 如果 element.anchor 不在 parentElement 中，则尝试 appendChild
        parentElement.appendChild(element.anchor);
      }
    }
  } else if (!dom && parentElement) {
    // 如果 dom 不存在但 parentElement 存在，直接 appendChild
    if (!isDescendant(parentElement, element.anchor)) {
      parentElement.appendChild(element.anchor);
    }
  } else {
    console.error('parentElement is undefined . ')
  }
}

// todo 先判断子节点中是否已经包含 element.dom
/**
 * mount/vIf true 时调用
 * mount 时， 判断 props.vIf为true时， 创建 element.dom， 并替换注释节点
 * 首次挂载时， 创建 element.dom，appendChild element.dom
 * 再次挂载时， 替换注释节点
 * todo  Fragment  anchor占位，dom挂载后内容是空的，如果dom要存在内容，需要把子节点再挂载上来。
 *   注： Fragment的 anchor占位，不能被替换，因为替换后是无法被找回的。
 *       应该 mount 时， 创建 element.anchor element.dom , 并且在 dom树上挂载了。
 * @param element
 * @param container
 */
export function insertDomAndAnchor(element: TypeNode, container?: RendererElement | null) {
  // if (upDom instanceof DocumentFragment) {
  //   console.warn('upDom is DocumentFragment . upDom is ', upDom);
  // }
  // if (element.dom instanceof DocumentFragment) {
  //   console.warn('element.dom is DocumentFragment. element is ', element);
  // }
  container = container ?? mountDom(element);
  if (!container) {
    console.warn('upDom is undefined . ');
    return;
  }
  // if (element.dom && isDescendant(upDom, element.dom) && element.anchor && isDescendant(upDom, element.anchor)) {
  //   console.error('upDom has element.dom and element.anchor ');
  // }
  const dom = element.dom as RawDom;
  // if (!element.isMounted) { // 没用
  //   console.warn('element is not mounted . ');
  //   // const to = getToDom(element);
  //   // element.mount(to);
  //   element.childNodes?.forEach(child => {
  //     child.mount(dom)
  //   });
  // } else {
    // 先判断子节点中是否已经包含 element.dom
    if (dom && isDescendant(container, dom)) return;
    if (dom instanceof DocumentFragment) {
      // 要把子元素挂载上来
      //   mount 时，是挂载了的。
      // if (dom.childNodes.length > 0) { // mount 时，vIf is false , 子元素没有挂载，这是也是要 reset 的；
      //   //   fragment.dom 有子元素
      // } else {
      // useUpdate(element); // todo
      // element.childNodes?.forEach(child => {
      //   // child.mount(dom); // todo tooltip会多次挂载 tooltip
      // })
      resetDom(element); // 应该处理 upDom的在 anchorStart 何 anchor 之间的节点。
      // }
      // console.warn('dom is ', dom);
    }
  // }
  // Todo Teleport  element.anchor ---> element.parent.dom
  //                element.dom ----->  toDom; element.targetAnchor
  if (element.className === 'Teleport') {
     if (dom && element.targetAnchor && element.targetStart) {
       if (isDescendant(container, element.targetAnchor)) {
         container?.insertBefore(dom, element.targetAnchor);
       } else {
         container.appendChild(element.targetStart);
         container.appendChild(dom);
         container.appendChild(element.targetAnchor);
       }
     }
     const parentDom = element.parent?.dom;
     if (parentDom && element.anchorStart && element.anchor) {
       parentDom.appendChild(element.anchorStart);
       parentDom.appendChild(element.anchor);
     }
  } else if (dom && element.anchor && isDescendant(container, element.anchor)) {
    // 应该在 mount 中创建，并添加
    // todo replaceChild ?? insertBefore
    if (dom instanceof DocumentFragment) {
      container?.insertBefore(dom, element.anchor);
    } else {
      container?.replaceChild(dom, element.anchor);
    }
  } else {
    console.error('element.anchor not a child of upDom . element is ', element);
    // tooltip examples error not show tooltip content;
    // todo tooltip content error
    if (element.isMounted) {
      if (dom && element.anchor && !isDescendant(container, element.anchor) && !isDescendant(container, dom) ) {
        if (dom instanceof DocumentFragment && element.anchorStart) {
          if (element.anchorStart) {
            container.appendChild(element.anchorStart);
          } else {
            console.error('Fragment not have anchorStart')
          }
          container?.appendChild(element.anchor);
          container?.insertBefore(dom, element.anchor);
        } else {
          // todo tooltip content error upDom is DocumentFragment, not mount to dom;
          if (element.className === 'TdPopperContent') {
            console.warn('insertDomAndAnchor TdPopperContent render . ');
            if (element.anchor.parentElement) {
              element.anchor.parentElement.insertBefore(dom, element.anchor);
            } else if (element.anchor.parentNode) {
              element.anchor.parentNode.insertBefore(dom, element.anchor);
              // todo element.anchor.parentNode 为什么没有mount时挂载。
              if (element.anchor.parentNode instanceof DocumentFragment) {
                container?.appendChild(element.anchor.parentNode);
              }
            } else {
              console.error('element.anchor.parentElement and element.anchor.parentNode are null . element is ', element);
              container?.appendChild(dom);
            }
          } else {
            container?.appendChild(dom);
          }
        }
      }
    }
    // mount 时触发；
    // if (dom){
    //   if (dom instanceof DocumentFragment) {
    //     // if (element.className === undefined) {
    //     //   console.error('element.className === undefined , element is ', element);
    //     // }
    //     // if (element.uid === 50) {
    //     //   console.error('element.uid === 50 , element is ', element);
    //     // }
    //     setFragmentAnchorAndDom(element as TypeFragment, upDom)
    //   } else {
    //     upDom?.appendChild(dom);
    //     element.anchor = element.anchor ?? document.createComment('v-if' + element.className + '' + element.uid);
    //     upDom?.appendChild(element.anchor);
    //   }
    // }
  }
}

export function setFragmentAnchorWithoutDom(element: TypeNode, upDom: RawDom | Text | Comment) {
  if (upDom instanceof Text || upDom instanceof Comment) {
    console.error('upDom is Text or Comment . ');
    return;
  }
  let dom = element.dom;
  if (!dom) dom = createDom(element);
  if (dom instanceof DocumentFragment) {
    element.anchorStart = element.anchorStart ?? document.createComment('[' + element.className + '' + element.uid);
    element.anchor = element.anchor ?? document.createComment(element.className + '' + element.uid + ']');
    if (element.className === 'Teleport') {
      const parentDom = element.parent?.dom
      if (parentDom && element.anchor && !isDescendant(parentDom, element.anchor)) {
        parentDom.appendChild(element.anchorStart);
        parentDom.appendChild(element.anchor);
      }
    } else {
      if (!isDescendant(upDom, element.anchorStart)) {
        upDom.appendChild(element.anchorStart);
      }
      removeDom(element);
      // if (isDescendant(upDom, dom)) {
      //   upDom.removeChild(dom); // DocumentFragment 的子节点会被挂载到上级Element节点上；
      // }
      if (!isDescendant(upDom, element.anchor)) {
        upDom.appendChild(element.anchor);
      }
    }
  } else {
    console.error('element.dom is not DocumentFragment . ');
  }
}
// export function removeFragmentDom(element: TypeFragment) {
//   if (element.dom?.childNodes.length === 0) {
//     removeDom(element);
//   }
// }
