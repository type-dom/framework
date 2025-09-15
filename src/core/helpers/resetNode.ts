import { isDescendant } from '@type-dom/utils';
import { unref } from '../../reactivity';
import { RawDom, TypeFragment } from '../components';
import { TypeNode } from '../type-node/type-node.abstract';
import { anchorReplaceDom, setElementAnchor, setFragmentAnchorWithDom, setFragmentAnchorWithoutDom } from './anchorAndDom';
import { createDom } from './createDom';
import { mountDom } from './mountDom';
import { removeDom } from './removeDom';

/**
 * 重置dom树
 */
export function resetNode(node: TypeNode): void {
  const dom = createDom(node) as RawDom;
  if (!dom) {
    console.error('dom is undefined . ');
    return;
  }
  const upDom = mountDom(node);
  if (!upDom) {
    console.error('upDom is undefined . ');
    return;
  }
  node.childNodes?.forEach((child) => {
    if (!child.isRendered) { // child.isMounted 有问题；
      console.error('child is not mounted . ');
      // const to = getToDom(child);
      // todo  dom ??? upDom
      child.mount(dom);
    } else {
      resetNode(child); // 递归
    }
  });
  //  vIf 处理
  if (Object.prototype.hasOwnProperty.call(node.baseProps, 'vIf')) {
    const condition = unref(node.baseProps.vIf);
    if (condition) {
      if (dom instanceof DocumentFragment) {
        if (!node.anchor) {
          console.error('node.dom is DocumentFragment, but node.anchor is undefined . ');
          return;
        }
            setFragmentAnchorWithDom(node as TypeFragment, upDom);
      } else { // 普通元素
        if (isDescendant(upDom, dom)) {
          console.warn('dom has been  descendant of upDom . ');
        } else {
          console.error('dom is not descendant of upDom . ');
          setFragmentAnchorWithDom(node as TypeFragment, upDom);
        }
      }
    } else {
      if (dom instanceof DocumentFragment) {
        setFragmentAnchorWithoutDom(node as TypeFragment, upDom);
      } else {
        setElementAnchor(node, upDom);
        if (isDescendant(upDom, dom)) {
          console.warn('dom has been  descendant of upDom . ');
          anchorReplaceDom(node, upDom)
        } else {
          console.error('dom is not descendant of upDom . ');
          removeDom(node);
        }
      }
    }
  }
  else { // 无 vIf
    if (dom instanceof DocumentFragment) {
      if (!node.anchor) {
        console.error('node.dom is DocumentFragment, but node.anchor is undefined . ');
        return;
      }
        // childDom 时 DocumentFragment时，必然有 anchor/anchorStart, 所以不需要判断 vIf
        setFragmentAnchorWithDom(node as TypeFragment, upDom);
    } else {
      if (isDescendant(upDom, dom)) {
        console.warn('dom has been  descendant of upDom . ');
      } else {
        if (node.anchor) {
          // 正常不会有
          console.error('node.anchor is there. ');
        }
        upDom.appendChild(dom);
      }
    }
  }
  node.render();
}
