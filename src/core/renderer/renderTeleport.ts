import { isDescendant } from '@type-dom/utils';
import { Teleport } from '../../dom/components/teleport/teleport.class';
import { unref } from '../../reactivity';
import { getTarget } from '../helpers/getNodeContainer';
import { nextTick } from '../scheduler';
import { onMounted } from '../apiLifecycle';
import { renderAnchor } from './anchor';
import { RendererElement } from './renderer';
import { removeBetween } from './removeBetween';

/**
 * 处理 Teleport
 * Teleport target 和 container 要分开处理
 * @param teleport
 * @param container
 * @param show
 */
export function renderTeleport(teleport: Teleport, container: RendererElement, show = true) {
  // console.warn('renderTeleport . ');
  // console.warn('teleport.isMounted is ', teleport.isMounted);
  if (unref(teleport.disabled)) {
    renderAnchor(teleport, container);
    if (teleport.dom.childNodes.length === 0) {
      removeBetween(teleport.targetStart, teleport.targetAnchor, teleport.dom);
    }
    teleport.anchor.parentNode?.insertBefore(teleport.dom, teleport.anchor);
    return;
  }
  if (show) {
    if (!teleport.isMounted) {
      // todo 临时处理  error new Fragment({ slot: [ Teleport, other ] }).mount(dom);
      if (container) {
        renderAnchor(teleport, container);
      } else {
        // console.error('container is null');
      }
    } else {
      // console.warn('teleport.isMounted is true . ');
    }

    let target = getTarget(teleport);
    // if (target === container) {
    //   console.error('target === container');
    // }
    if (!target) {
      if (teleport.root?.isMounted) {
        nextTick(() => {
          target = getTarget(teleport);
          if (target) {
            insertTarget(teleport, target);
          }
        });
      } else {
        onMounted(() => {
          target = getTarget(teleport);
          if (target) {
            insertTarget(teleport, target);
          } else {
            // console.error('target is null');
            nextTick(() => {
              target = getTarget(teleport);
              if (target) {
                insertTarget(teleport, target);
              }
            });
          }
        }, teleport.root);
      }
    } else {
      insertTarget(teleport, target);
    }
  } else {
  //   todo 暂时用不到。
  }
}

function insertTarget(teleport: Teleport, target: RendererElement) {
  // to maybe ref, change target
  removeBetween(teleport.targetStart, teleport.targetAnchor, teleport.dom);
  if (!isDescendant(target, teleport.targetStart))
    target.appendChild(teleport.targetStart);
  if (!isDescendant(target, teleport.targetAnchor))
    target.appendChild(teleport.targetAnchor);

  if (teleport.dom) {
    // it is a DocumentFragment
    // console.error('Teleport insertTarget . ');
    if (teleport.dom.childNodes.length === 0) {
      // maybe mount parent.dom
      // console.error('teleport.dom.childNodes.length === 0');
      // mount 时， child.mount 应该已经执行过一次了，也就是已经加载了，不需要在执行一次了。应该已经挂载在 teleport.dom 中了。
      //   此时应该要么挂载在 teleport.anchorStart/anchor 之间，要么挂载在 targetStart/targetAnchor 之间。
      //   disabled已经被拦截，所以只能在 targetStart/targetAnchor 之间。
      //   那就不需要处理了啊 ？？？ Teleport.test.ts #7835 933 line error
      // 所以，只有 watch to 或 disabled 时，才会执行到这里。
      removeBetween(teleport.anchorStart, teleport.anchor, teleport.dom);
    }
    target.$node = teleport; // unmount时可以卸载。
    target.insertBefore(teleport.dom, teleport.targetAnchor);
  }
}
