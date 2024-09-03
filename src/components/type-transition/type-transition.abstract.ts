import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import type { ITransitionConfig } from '../transition/transition.interface';
import { getTransitionInfo, nextFrame } from '../transition/transition.util';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { SlotNode } from '../slot-node/slot-node.class';
import { ITypeTransition } from './type-transition.interface';

export abstract class TypeTransition extends TypeFragment implements ITypeTransition {
  mode: 'in-out' | 'out-in' | 'default';
  display?: string; // 显示/隐藏 切换时控制显示的display的值
  timer?: NodeJS.Timeout;
  slotNode: SlotNode;
  override props: ITransitionConfig;

  constructor(params?: ITransitionConfig) {
    super();
    this.nodeName = 'fragment';
    this.dom = undefined;
    this.mode = params?.mode || 'in-out';
    this.parent = params?.parent;
    this.slotNode = new SlotNode('default');
    this.addChild(this.slotNode);
    if (params?.slot) {
      this.slotNode.addSlot(params.slot)
    }
    // 处理 params, to props
    this.props = this.setParams(params);
  }

  // 显示、隐藏 slot
  showSlot(show: boolean) {
    console.log('Transition showSlot, show is ', show);
    if (!this.props.slot) {
      return;
    }
    if (show) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.props.slot.ctrl.setStyleObj({
        display: this.display,
      });
      this.beforeEnter(this.props.slot);
      this.enter(this.props.slot);
      this.afterEnter(this.props.slot);
    } else {
      this.beforeLeave(this.props.slot);
      this.leave(this.props.slot);
      this.afterLeave(this.props.slot);

      nextFrame(() => {
        if (this.props.slot?.dom) {
          const { timeout } = getTransitionInfo(this.props.slot.dom);
          console.log('timeout is ', timeout);
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.props.slot?.ctrl.setStyleObj({
              display: 'none',
            });
          }, timeout);
        }
      });
    }
  }

  addSlot(slot: string | TypeNode | TypeNode[]) {
    this.slotNode.addSlot(slot);
  }
  // 加载 slot，并挂载到父级dom上；
  loadSlot() {
    if (!this.props.slot) {
      return;
    }
    this.beforeEnter(this.props.slot);
    this.enter(this.props.slot);
    this.afterEnter(this.props.slot);
  }

  // 删除 slot
  deleteSlot() {
    if (!this.props.slot) {
      return;
    }
    this.beforeLeave(this.props.slot);
    this.leave(this.props.slot);
    this.afterLeave(this.props.slot);
  }

  beforeEnter(el: TypeHtml | TypeSvg) {
    if (this.props.onBeforeEnter) {
      this.props.onBeforeEnter(el);
    } else {
      el.ctrl.setStyleObj({
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
      el.ctrl.setStyleObj({
        opacity: 1,
      });
    }
  }

  afterEnter(el: TypeHtml | TypeSvg) {
    if (this.props.onAfterEnter) {
      this.props.onAfterEnter(el);
    } else {
      el.ctrl.setStyleObj({
        opacity: el.props.styleObj?.opacity,
      });
    }
  }

  beforeLeave(el: TypeHtml | TypeSvg) {
    if (this.props.onBeforeLeave) {
      this.props.onBeforeLeave(el);
    } else {
      el?.ctrl.setStyleObj({
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
      el.ctrl.setStyleObj({
        opacity: 0,
      });
    }
  }

  afterLeave(el: TypeHtml | TypeSvg) {
    // 要有定时器
    if (this.props.onAfterLeave) {
      this.props.onAfterLeave(el);
    } else {
      el.ctrl.setStyleObj({
        opacity: el.props.styleObj?.opacity,
      });
    }
  }

  // 不能注释掉。this.slot没有加载到childNodes中。
  override render() {
    super.render();
    // 要渲染后再获取，否则会是空的。
    // ToDo 要考虑渲染后display是空的情况。
    const display = this.props.slot?.dom.style.display;
    console.log(' display is ', display);
    this.display = display;
  }
}
