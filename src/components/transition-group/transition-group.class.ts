import { toRaw } from '@type-dom/signals';
import { getCurrentInstance } from '../../core/instance';
import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { onUpdated } from '../../core/apiLifecycle';
import { useSlots } from '../../core/apiSetupHelpers';
import {
  resolveTransitionHooks,
  setTransitionHooks,
  useTransitionState,
} from '../../core/type-transition/type-transition.use';
import {
  addTransitionClass,
  forceReflow,
  removeTransitionClass,
  resolveTransitionProps,
} from '../transition/transition.util';
import { ElementWithTransition } from '../transition/transition.interface';
import {
  applyTranslation,
  callPendingCbs,
  hasCSSTransform,
  moveCbKey,
  positionMap,
  recordPosition,
} from './transition-group.util';
import { TransitionGroupProps } from './transition-group.interface';

export class TransitionGroup extends TypeFragment {
  className: 'TransitionGroup';
  override props: TransitionGroupProps;

  constructor(params: TransitionGroupProps = {}) {
    super();
    this.className = 'TransitionGroup';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const slots = useSlots();
    const instance = getCurrentInstance()!;
    const state = useTransitionState();
    let prevChildren: TypeNode[];
    let children: TypeNode[];

    this.slotChildren(props.slot || slots?.default);
    onUpdated(() => {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || 'v'}-move`;

      if (
        !hasCSSTransform(
          prevChildren[0].dom as ElementWithTransition,
          instance.dom as Node,
          moveClass
        )
      ) {
        return;
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);

      // force reflow to put everything in position
      forceReflow();

      movedChildren.forEach((c) => {
        const el = c.dom as ElementWithTransition;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = '';
        const cb = ((el as any)[moveCbKey] = (e: TransitionEvent) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb);
            (el as any)[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        });
        el.addEventListener('transitionend', cb);
      });
    });

    // return () => {
    const rawProps = toRaw(props);
    const cssTransitionProps = resolveTransitionProps(rawProps);

    // if (
    //   // __COMPAT__ &&
    //   !rawProps.tag &&
    //   compatUtils.checkCompatEnabled(
    //     DeprecationTypes.TRANSITION_GROUP_ROOT,
    //     instance.parent,
    //   )
    // ) {
    //   tag = 'span'
    // }

    prevChildren = [];
    // @ts-ignore
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.dom && child.dom instanceof Element) {
          prevChildren.push(child);
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
          positionMap.set(
            child,
            (child.dom as Element).getBoundingClientRect()
          );
        }
      }
    }

    children = this.childNodes; // (props.slot || slots?.default) ? getTransitionRawChildren(props.slot || slots?.default) : []

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.key != null) {
        setTransitionHooks(
          child,
          resolveTransitionHooks(child, cssTransitionProps, state, instance)
        );
      }
      // else if (__DEV__ && child.props.nodeName !== NodeName.TEXT) {
      //   warn(`<TransitionGroup> children must be keyed.`);
      // }
    }
    //
    //   return createVNode(tag, null, children)
    // }
  }
}
