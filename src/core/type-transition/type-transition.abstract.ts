import { SlotNode } from '../../components/slot-node/slot-node.class';
import type { ITransitionConfig } from '../../components/transition/transition.interface';
import { getTransitionInfo, nextFrame } from '../../components/transition/transition.util';
import { TypeFragment } from '../type-fragment/type-fragment.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { ITypeTransition } from './type-transition.interface';

export abstract class TypeTransition extends TypeFragment implements ITypeTransition {
  mode: 'in-out' | 'out-in' | 'default';
  display?: string; // 显示/隐藏 切换时控制显示的display的值
  timer?: NodeJS.Timeout;
  override props: ITransitionConfig;
  private el: TypeHtml | TypeSvg | undefined;

  constructor(params: ITransitionConfig = {}) {
    super();
    this.mode = params?.mode || 'in-out';
    this.parent = params?.parent;
    this.slotChild(params.slot);
    this.el = this.childNodes[0] as TypeHtml | TypeSvg | undefined;
    // 处理 params, to props
    // todo 如果是多个子节点，transition本身要成为一个 div 。
    //   现在只能有一个子节点。

    this.props = this.useParams(params);
  }

  /**
   * 确保slot存在，不存在则创建；
   * 要在useSlots之后调用
   * teleport.class.ts:2 Uncaught ReferenceError: Cannot access 'TypeFragment' before initialization
   * @param name
   */
  getSlotNode(name = 'default') {
    // return this.slotNodes[name];
    return this.slotNodes[name] = this.slotNodes[name] ?? new SlotNode(name);
  }

  // 显示、隐藏 slot
  showSlot(show: boolean) {
    console.log('Transition showSlot, show is ', show);
    if (!this.el) {
      console.warn('Transition showSlot, el is undefined.');
      return;
    }
    if (show) {
      if (this.timer) {
        clearTimeout(this.timer as unknown as number);
      }
      this.el?.style.setObj({
        display: this.display,
      });
      this.beforeEnter(this.el);
      this.enter(this.el);
      this.afterEnter(this.el);
    } else {
      this.beforeLeave(this.el);
      this.leave(this.el);
      this.afterLeave(this.el);

      nextFrame(() => {
        if (this.el?.dom) {
          const { timeout } = getTransitionInfo(this.el.dom);
          console.log('timeout is ', timeout);
          if (this.timer) {
            clearTimeout(this.timer as unknown as number);
          }
          this.timer = setTimeout(() => {
            this.el?.style.setObj({
              display: 'none',
            });
          }, timeout);
        }
      });
    }
  }

  // 加载 slot，并挂载到父级dom上；
  loadSlot() {
    if (!this.el) {
      return;
    }
    this.beforeEnter(this.el);
    this.enter(this.el);
    this.afterEnter(this.el);
  }

  // 删除 slot
  deleteSlot() {
    if (!this.el) {
      return;
    }
    this.beforeLeave(this.el);
    this.leave(this.el);
    this.afterLeave(this.el);
  }

  beforeEnter(el: TypeHtml | TypeSvg) {
    if (this.props.onBeforeEnter) {
      this.props.onBeforeEnter(el);
    } else {
      el.style.setObj({
        opacity: 0,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  enter(el: TypeHtml | TypeSvg) {
    if (this.props.onEnter) {
      this.props.onEnter(el, () => {
        console.log('enter , done . ');
      });
    } else {
      el.style.setObj({
        opacity: 1,
      });
    }
  }

  afterEnter(el: TypeHtml | TypeSvg) {
    if (this.props.onAfterEnter) {
      this.props.onAfterEnter(el);
    } else {
      el.style.setObj({
        opacity: el.style.get('opacity'),
      });
    }
  }

  beforeLeave(el: TypeHtml | TypeSvg) {
    if (this.props.onBeforeLeave) {
      this.props.onBeforeLeave(el);
    } else {
      el?.style.setObj({
        opacity: 1,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  leave(el: TypeHtml | TypeSvg) {
    if (this.props.onLeave) {
      this.props.onLeave(el, () => {
        console.log('leave , done . ');
      });
    } else {
      el.style.setObj({
        opacity: 0,
      });
    }
  }

  afterLeave(el: TypeHtml | TypeSvg) {
    // 要有定时器
    if (this.props.onAfterLeave) {
      this.props.onAfterLeave(el);
    } else {
      el.style.setObj({
        opacity: el.params.styleObj?.opacity,
      });
    }
  }

  // 不能注释掉。this.slot没有加载到childNodes中。
  override render() {
    super.render();
    // 要渲染后再获取，否则会是空的。
    // ToDo 要考虑渲染后display是空的情况。
    const display = this.el?.dom.style.display;
    console.log(' display is ', display);
    this.display = display;
  }
}
