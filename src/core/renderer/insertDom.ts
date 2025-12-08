import { isDescendant } from '@type-dom/utils';
import { mountDom } from '../helpers/mountDom';
import { resetDom } from '../helpers/resetDom';
import { TypeNode } from '../type-node/type-node.abstract';
import { flushPostFlushCbs, flushPreFlushCbs } from '../scheduler';
import { unmount } from './unmount';
import { ElementNamespace, RendererElement } from './renderer';

export type RootRenderFunction = (
  vnode: TypeNode | null,
  container?: RendererElement | null,
  namespace?: ElementNamespace,
) => void

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
let isFlushing = false
export const insertDom: RootRenderFunction = (element, container, namespace) => {
  if (element == null) {
    if ((container as any)._vnode) {
      unmount((container as any)._vnode, undefined, undefined, true)
    }
  } else {
    // patch( // todo
    //   container._vnode || null,
    //   vnode,
    //   container,
    //   null,
    //   null,
    //   null,
    //   namespace,
    // )
    // if (container instanceof DocumentFragment) {
    //   console.warn('container is DocumentFragment . container is ', container);
    // }
    // if (element.dom instanceof DocumentFragment) {
    //   console.warn('element.dom is DocumentFragment. element is ', element);
    // }
    container = container ?? mountDom(element);
    if (!container) {
      console.warn('container is undefined . ');
      return;
    }
    // if (element.dom && isDescendant(container, element.dom) && element.anchor && isDescendant(container, element.anchor)) {
    //   console.error('container has element.dom and element.anchor ');
    // }
    const dom = element.dom as RendererElement;
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
      resetDom(element); // 应该处理 container的在 anchorStart 何 anchor 之间的节点。
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
      console.error('element.anchor not a child of container . element is ', element);
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
            // todo tooltip content error container is DocumentFragment, not mount to dom;
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
      //     setFragmentAnchorAndDom(element as TypeFragment, container)
      //   } else {
      //     container?.appendChild(dom);
      //     element.anchor = element.anchor ?? document.createComment('v-if' + element.className + '' + element.uid);
      //     container?.appendChild(element.anchor);
      //   }
      // }
    }

  }
  (container as any)._vnode = element
  if (!isFlushing) {
    isFlushing = true
    flushPreFlushCbs()
    flushPostFlushCbs()
    isFlushing = false
  }
}
