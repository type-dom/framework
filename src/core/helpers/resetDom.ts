import { isDescendant } from '@type-dom/utils';
import { unref } from '../../reactivity';
import { RawDom, TypeFragment } from '../components';
import { TypeNode } from '../type-node/type-node.abstract';
import { setFragmentAnchorWithDom, setFragmentAnchorWithoutDom } from './anchorAndDom';
import { createDom } from './createDom';
import { getToDom } from './mountDom';

/**
 * 重置dom树
 * todo diff 算法
 *      考虑 vIf vElse 的情况 ？？？
 *      是否需要 render
 */
export function resetDom(node: TypeNode): void {
  const dom = createDom(node) as RawDom;
  // const to = getToDom(node);
  // removeDom(node); // todo 有问题； 要保证子节点dom不会被挂载到上级dom树上；
  node.childNodes?.forEach((child) => {
    if (!child.isRendered) { // child.isMounted 有问题；
      console.error('child is not mounted . ');
      // const to = getToDom(child);
      // child.mount(dom);
    } else {
      resetDom(child); // 递归
      const childDom = createDom(child);
      const to = getToDom(child);
      const upDom = to ?? dom;
      if (childDom instanceof DocumentFragment) {
        //  vIf 处理
        if (Object.prototype.hasOwnProperty.call(child.baseProps, 'vIf')) {
          const condition = unref(child.baseProps.vIf);
          if (condition) {
            setFragmentAnchorWithDom(child as TypeFragment, upDom);
          } else {
            setFragmentAnchorWithoutDom(child as TypeFragment, upDom);
          }
        } else {
          // childDom 时 DocumentFragment时，必然有 anchor/anchorStart, 所以不需要判断 vIf
          setFragmentAnchorWithDom(child as TypeFragment, upDom);
        }
        if (!child.anchor) {
          console.error('child is DocumentFragment, but child.anchor is undefined . ');
        }
      } else { // 普通元素
        if (Object.prototype.hasOwnProperty.call(child.baseProps, 'vIf')) {
          if (!child.anchor) {
            console.error('child.anchor is undefined . ');
            return;
          }
          const condition = unref(child.baseProps.vIf);
          if (condition) { // replace dom
            // if (!isDescendant(upDom, childDom)) {
            //   upDom.replaceChild(childDom, child.anchor);
            // }
            if (isDescendant(upDom, child.anchor)) { // upDom 可能时 DocumentFragment; 也就是要 resetDom 的对象；
              upDom.replaceChild(childDom, child.anchor);
            } else {
              upDom.appendChild(childDom);
            }
          } else { // without dom
            if (isDescendant(upDom, childDom)) { // todo
              // if (upDom instanceof DocumentFragment) {
              //   //
              //   upDom.replaceChild(child.anchor, childDom);
              // } else {
              //   upDom.replaceChild(child.anchor, childDom);
              // }
              upDom.replaceChild(child.anchor, childDom);
            } else {
              // console.error('childDom is not descendant of upDom . ');
              if (upDom instanceof DocumentFragment) {
                //
              } else { // anchor 除了mount时会插入 fragment， 最终会挂载到 real dom；
                if (!isDescendant(upDom, child.anchor)) upDom.appendChild(child.anchor); // 应该已经插入了 upRealDom 中
              }
            }
          }
        } else {
          if (!isDescendant(upDom, childDom)) {
            if (child.anchor && isDescendant(upDom, child.anchor)) {
              upDom.replaceChild(childDom, child.anchor);
            } else {
              upDom.appendChild(childDom);
            }
          }
        }
      }
    }
  });
  node.render();
}
