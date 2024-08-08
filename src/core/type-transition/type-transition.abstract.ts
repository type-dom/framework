import type { ITransitionConfig } from '../../components/transition/transition.interface';
import { getTransitionInfo, nextFrame } from '../../components/transition/transition.util';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { TypeFragment } from '../type-fragment/type-fragment.abstract';
import { ITypeTransition } from './type-transition.interface';

export abstract class TypeTransition extends TypeFragment implements ITypeTransition {
  override slot?: TypeHtml | TypeSvg; // todo 考虑slot是数组的情况
  mode: 'in-out' | 'out-in' | 'default';
  display?: string; // 显示/隐藏 切换时控制显示的display的值
  timer?: NodeJS.Timeout;

  constructor(public override config?: ITransitionConfig) {
    super();
    this.nodeName = 'fragment';
    this.dom = undefined;
    this.slot = config?.slot;
    this.mode = config?.mode || 'in-out';
    this.parent = config?.parent;
    if (config?.slot) {
      this.slotChild(config.slot);
    }
    //   todo 处理 config
    this.setConfig();
  }

  // override setConfig() {
  //   console.log('Transition setConfig');
  // }
  // 显示、隐藏 slot
  showSlot(show: boolean) {
    console.log('Transition showSlot, show is ', show);
    if (!this.slot) {
      return;
    }
    if (show) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.slot.setStyleObj({
        display: this.display,
      });
      this.beforeEnter(this.slot);
      this.enter(this.slot);
      this.afterEnter(this.slot);
    } else {
      this.beforeLeave(this.slot);
      this.leave(this.slot);
      this.afterLeave(this.slot);

      nextFrame(() => {
        if (this.slot?.dom) {
          const { timeout } = getTransitionInfo(this.slot.dom);
          console.log('timeout is ', timeout);
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.slot?.setStyleObj({
              display: 'none',
            });
          }, timeout);
        }
      });
    }
  }

  // 加载 slot，并挂载到父级dom上；
  loadSlot() {
    if (!this.slot) {
      return;
    }
    this.beforeEnter(this.slot);
    this.enter(this.slot);
    this.afterEnter(this.slot);
  }

  // 删除 slot
  deleteSlot() {
    if (!this.slot) {
      return;
    }
    this.beforeLeave(this.slot);
    this.leave(this.slot);
    this.afterLeave(this.slot);
  }

  beforeEnter(el: TypeHtml | TypeSvg) {
    if (this.config?.onBeforeEnter) {
      this.config.onBeforeEnter(el);
    } else {
      el.setStyleObj({
        opacity: 0,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  enter(el: TypeHtml | TypeSvg) {
    if (this.config?.onEnter) {
      this.config.onEnter(el, () => {
        console.log('enter , done . ');
      });
    } else {
      el.setStyleObj({
        opacity: 1,
      });
    }
  }

  afterEnter(el: TypeHtml | TypeSvg) {
    if (this.config?.onAfterEnter) {
      this.config.onAfterEnter(el);
    } else {
      el.setStyleObj({
        opacity: el.styleObj.opacity,
      });
    }
  }

  beforeLeave(el: TypeHtml | TypeSvg) {
    if (this.config?.onBeforeLeave) {
      this.config.onBeforeLeave(el);
    } else {
      el?.setStyleObj({
        opacity: 1,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  leave(el: TypeHtml | TypeSvg) {
    if (this.config?.onLeave) {
      this.config.onLeave(el, () => {
        console.log('leave , done . ');
      });
    } else {
      el.setStyleObj({
        opacity: 0,
      });
    }
  }

  afterLeave(el: TypeHtml | TypeSvg) {
    // 要有定时器
    if (this.config?.onAfterLeave) {
      this.config.onAfterLeave(el);
    } else {
      el.setStyleObj({
        opacity: el.styleObj.opacity,
      });
    }
  }

  // 不能注释掉。this.slot没有加载到childNodes中。
  override render() {
    super.render();
    // 要渲染后再获取，否则会是空的。
    // ToDo 要考虑渲染后display是空的情况。
    const display = this.slot?.dom.style.display;
    console.log(' display is ', display);
    this.display = display;
  }
}
