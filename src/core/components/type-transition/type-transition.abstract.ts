import { toRaw } from '../../../reactivity';
import { warn } from '../../warning';
import { getCurrentInstance } from '../../component';
import { TypeNode } from '../../type-node/type-node.abstract';
import { isSameNodeType } from '../../helpers/isSameVNodeType';
import { TypeFragment } from '../type-fragment/type-fragment.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import {
  leaveCbKey,
  emptyPlaceholder,
  findNonCommentChild,
  getInnerChild,
  getLeavingNodesForType,
  resolveTransitionHooks,
  setTransitionHooks,
  useTransitionState,
  getTransitionRawChildren,
} from './type-transition.use';
import {
  ITypeTransition,
  TransitionElement,
  // TypeTransitionProps,
} from './type-transition.interface';
import { transformSlot } from '../../helpers/transformSlot';

export abstract class TypeTransition
  extends TypeFragment
  implements ITypeTransition
{
  // mode: 'in-out' | 'out-in' | 'default';
  // timer?: NodeJS.Timeout;
  // override props: TypeTransitionProps<Element>;
  // 唯一子节点
  private content?: TypeHtml;

  // constructor(params: TypeTransitionProps<Element> = {}) {
  //   super();
  //   // console.warn('TypeTransition constructor. params is ', params);
  //   // this.mode = params?.mode || 'in-out';
  //   // this.parent = params?.parent;
  //   // if (params.slot instanceof TypeHtml) {
  //   //   transformSlot(this, params.slot);
  //   //   this.content = params.slot;
  //   //   // this.addChild(this.content);
  //   //   // 处理 params, to props
  //   //   // todo 如果是多个子节点，transition本身要成为一个 div 。
  //   //   //   现在只能有一个子节点。
  //   //   this.props = resolveTransitionProps(params);
  //   //   console.log('props is ', this.props);
  //   //   params.slot.setTransitionProps(this.props as TransitionProps);
  //   // }
  //   // this.props = this.useParams(params);
  //   // this.props = resolveTransitionProps(params);
  // }

  override setup() {
    // console.warn('TypeTransition setup.');
    const props = this.props;
    const { slots } = props;
    const instance = getCurrentInstance()!;
    const state = useTransitionState();

    // transformSlot(this, props.slot ?? slots?.default);
    transformSlot(this, props.slot ?? slots?.default);
    const children =
      (props.slot ?? slots?.default) &&
      getTransitionRawChildren(this.childNodes, true); // 获取真实dom子节点，过滤Fragment等节点
    if (!children || !children.length) {
      return;
    }

    const child: TypeNode = findNonCommentChild(children);
    // there's no need to track reactivity for these props so use the raw
    // props for a bit better perf
    const rawProps = toRaw(props);
    const { mode } = rawProps;
    // check mode
    if (
      // __DEV__ &&
      mode &&
      mode !== 'in-out' &&
      mode !== 'out-in' &&
      mode !== 'default'
    ) {
      warn(`invalid <transition> mode: ${mode}`);
    }

    if (state.isLeaving) {
      emptyPlaceholder(child);
      return;
    }

    // in the case of <transition><keep-alive/></transition>, we need to
    // compare the type of the kept-alive children.
    // const innerChild = getInnerChild(child) // todo 暂时没有 keep-alive 组件
    // if (!innerChild) {
    //   emptyPlaceholder(child)
    //   return;
    // }
    const innerChild = child;

    let enterHooks = resolveTransitionHooks(
      innerChild,
      rawProps,
      state,
      instance,
      // #11061, ensure enterHooks is fresh after clone
      (hooks) => (enterHooks = hooks)
    );

    if (innerChild.baseProps.nodeName !== '#comment') {
      setTransitionHooks(innerChild, enterHooks);
    }

    let oldInnerChild = instance.childNodes && getInnerChild(instance);

    // handle mode
    if (
      oldInnerChild &&
      oldInnerChild.baseProps.nodeName !== '#comment' &&
      !isSameNodeType(innerChild, oldInnerChild)
      // &&
      // recursiveGetSubtree(instance).props.nodeName !== '#comment'
    ) {
      const leavingHooks = resolveTransitionHooks(
        oldInnerChild,
        rawProps,
        state,
        instance
      );
      // update old tree's hooks in case of dynamic transition
      setTransitionHooks(oldInnerChild, leavingHooks);
      // switching between different views
      if (mode === 'out-in' && innerChild.baseProps.nodeName !== '#comment') {
        // console.warn('mode is out-in ');
        state.isLeaving = true;
        // return placeholder node and queue update when leave finishes
        leavingHooks.afterLeave = () => {
          state.isLeaving = false;
          // #6835
          // it also needs to be updated when active is undefined
          // if (!(instance.job.flags! & SchedulerJobFlags.DISPOSED)) {
          //   instance.update()
          // }
          delete leavingHooks.afterLeave;
          oldInnerChild = undefined;
        };
        emptyPlaceholder(child);
        return;
      } else if (
        mode === 'in-out' &&
        innerChild.baseProps.nodeName !== '#comment'
      ) {
        // console.warn('mode is in-out ');
        leavingHooks.delayLeave = (
          el: TransitionElement,
          earlyRemove,
          delayedLeave
        ) => {
          const leavingVNodesCache = getLeavingNodesForType(
            state,
            oldInnerChild!
          );
          leavingVNodesCache[String(oldInnerChild!.key)] = oldInnerChild!;
          // early removal callback
          el[leaveCbKey] = () => {
            earlyRemove();
            el[leaveCbKey] = undefined;
            delete enterHooks.delayedLeave;
            oldInnerChild = undefined;
          };
          enterHooks.delayedLeave = () => {
            delayedLeave();
            delete enterHooks.delayedLeave;
            oldInnerChild = undefined;
          };
        };
      } else {
        oldInnerChild = undefined;
      }
    } else if (oldInnerChild) {
      oldInnerChild = undefined;
    }
  }

  setContent(content: TypeHtml) {
    if (this.content) {
      this.replaceChildren(content);
    } else {
      this.addChild(content);
    }
    this.content = content;
  }

  // 显示、隐藏 slot
  // showSlot(show: boolean, display = 'flex') {
  //   // console.log('Transition showSlot, show is ', show);
  //   if (!this.content) {
  //     console.warn('Transition showSlot, el is undefined.');
  //     return;
  //   }
  //   if (show) {
  //     if (this.timer) {
  //       clearTimeout(this.timer as unknown as number);
  //     }
  //     this.content.style?.setObj({
  //       display: display,
  //     });
  //     this.beforeEnter(this.content);
  //     this.enter(this.content);
  //     this.afterEnter(this.content);
  //   } else {
  //     this.beforeLeave(this.content);
  //     this.leave(this.content);
  //     this.afterLeave(this.content);
  //
  //     nextFrame(() => {
  //       if (this.content?.dom) {
  //         const { timeout } = getTransitionInfo(this.content.dom);
  //         // console.log('timeout is ', timeout);
  //         if (this.timer) {
  //           clearTimeout(this.timer as unknown as number);
  //         }
  //         this.timer = setTimeout(() => {
  //           this.content?.style?.setObj({
  //             display: 'none',
  //           });
  //         }, timeout);
  //       }
  //     });
  //   }
  // }

  // 加载 slot，并挂载到父级dom上；
  // loadSlot() {
  //   if (!this.content) {
  //     return;
  //   }
  //   this.beforeEnter(this.content);
  //   this.enter(this.content);
  //   this.afterEnter(this.content);
  // }

  // 删除 slot
  // deleteSlot() {
  //   if (!this.content) {
  //     return;
  //   }
  //   this.beforeLeave(this.content);
  //   this.leave(this.content);
  //   this.afterLeave(this.content);
  // }

  // beforeEnter(el: TypeHtml) {
  //   if (this.baseProps.onBeforeEnter) {
  //     this.baseProps.onBeforeEnter(el.dom);
  //   } else {
  //     el.style?.setObj({
  //       opacity: 0,
  //       transition: 'opacity 0.3s ease-' + this.mode,
  //     });
  //   }
  // }
  //
  // enter(el: TypeHtml) {
  //   if (this.baseProps.onEnter) {
  //     this.baseProps.onEnter(el.dom, () => {
  //       console.log('enter , done . ');
  //     });
  //   } else {
  //     el.style?.setObj({
  //       opacity: 1,
  //     });
  //   }
  // }
  //
  // afterEnter(el: TypeHtml) {
  //   if (this.props.onAfterEnter) {
  //     this.props.onAfterEnter(el.dom);
  //   } else {
  //     el.style?.setObj({
  //       opacity: el.style?.get('opacity'),
  //     });
  //   }
  // }
  //
  // beforeLeave(el: TypeHtml) {
  //   if (this.props.onBeforeLeave) {
  //     this.props.onBeforeLeave(el.dom);
  //   } else {
  //     el?.style?.setObj({
  //       opacity: 1,
  //       transition: 'opacity 0.3s ease-' + this.mode,
  //     });
  //   }
  // }
  //
  // leave(el: TypeHtml) {
  //   if (this.props.onLeave) {
  //     this.props.onLeave(el.dom, () => {
  //       console.log('leave , done . ');
  //     });
  //   } else {
  //     el.style?.setObj({
  //       opacity: 0,
  //     });
  //   }
  // }
  //
  // afterLeave(el: TypeHtml) {
  //   // 要有定时器
  //   if (this.props.onAfterLeave) {
  //     this.props.onAfterLeave(el.dom);
  //   } else {
  //     el.style?.setObj({
  //       opacity: (el.params.styleObj as CSSProperties)?.opacity,
  //     });
  //   }
  // }
}
