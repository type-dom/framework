import { isDescendant } from '@type-dom/utils';
import { Teleport } from '../../dom/components/teleport/teleport.class';
import { unref } from '../../reactivity';
import { getToDom } from '../helpers/mountDom';
import { removeDom } from './removeDom';
import { RawDom } from './renderer';
// import { remove } from './remove';

/**
 * 处理 Teleport
 * Teleport upDom 和 toDom 要分开处理
 * @param teleport
 * @param upDom
 */
export function processTeleport(teleport: Teleport, container?: RawDom) {
  console.warn('processTeleport . ');
  console.warn('teleport.isMounted is ', teleport.isMounted);
  // if (teleport.isMounted) {
  //   upDom = teleport.anchorStart?.parentElement;
  // } else {
  //   upDom = teleport.parent?.dom;
  // }

  teleport.anchorStart =
    teleport.anchorStart ?? document.createComment('teleport start');
  teleport.anchor = teleport.anchor ?? document.createComment('teleport end');
  teleport.targetStart?.remove();
  teleport.targetAnchor?.remove();
  removeDom(teleport);
  // remove(teleport);
  if (unref(teleport.disabled)) {
    teleport.anchorStart.remove();
    teleport.anchor.remove();
    return;
  }
  if (!teleport.isMounted) { // todo 临时处理  error new Fragment({ slot: [ Teleport, other ] }).mount(dom);
    if (container) {
      if (teleport.anchorStart && !isDescendant(container, teleport.anchorStart)) {
        container.appendChild(teleport.anchorStart);
      }
      if (teleport.anchor && !isDescendant(container, teleport.anchor)) {
        container.appendChild(teleport.anchor);
      }
    } else {
      console.error('upDom is null');
    }
  } else {
    console.warn('teleport.isMounted is true . ');
  }

  teleport.targetStart =
    teleport.targetStart ?? document.createComment('target start');
  teleport.targetAnchor =
    teleport.targetAnchor ?? document.createComment('target anchor');
  const toDom = getToDom(teleport);
  if (toDom === container) {
    console.error('toDom === upDom');
  }
  if (toDom) {
    if (!isDescendant(toDom, teleport.targetStart))
      toDom.appendChild(teleport.targetStart);
    if (!isDescendant(toDom, teleport.targetAnchor))
      toDom.appendChild(teleport.targetAnchor);
  } else {
    console.error('toDom is null');
  }

  if (teleport.dom) {
    teleport.childNodes.forEach((child) => {
      child.mount(teleport.dom);
    });
    toDom?.insertBefore(teleport.dom, teleport.targetAnchor);
  }
}
