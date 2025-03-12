import { TypeNode } from '../../core/type-node/type-node.abstract';
import { ElementWithTransition, vtcKey } from '../transition/transition.interface';
import { getTransitionInfo } from '../transition/transition.util';

export const positionMap = new WeakMap<TypeNode, DOMRect>();
export const newPositionMap = new WeakMap<TypeNode, DOMRect>();
export const moveCbKey = Symbol('_moveCb');
export const enterCbKey = Symbol('_enterCb');

export function callPendingCbs(c: TypeNode) {
  const el = c.dom as any;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}

export function recordPosition(c: TypeNode) {
  newPositionMap.set(c, (c.dom as Element).getBoundingClientRect());
}

export function applyTranslation(c: TypeNode): TypeNode | undefined {
  const oldPos = positionMap.get(c)!;
  const newPos = newPositionMap.get(c)!;
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = (c.dom as HTMLElement).style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = '0s';
    return c;
  }
  return undefined;
}

export function hasCSSTransform(
  el: ElementWithTransition,
  root: Node,
  moveClass: string
): boolean {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode() as HTMLElement;
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach(cls => {
      cls.split(/\s+/).forEach(c => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach(c => c && clone.classList.add(c));
  clone.style.display = 'none';
  const container = (
    root.nodeType === 1 ? root : root.parentNode
  ) as HTMLElement;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
