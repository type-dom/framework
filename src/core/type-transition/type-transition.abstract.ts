import type { ITransitionConfig } from '../../components/transition/transition.interface';
import { getTransitionInfo, nextFrame } from '../../components/transition/transition.util';
import { DummyElement } from '../dummy-element/dummy-element.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeTransition } from './type-transition.interface';

export abstract class TypeTransition extends DummyElement implements ITypeTransition {
  abstract override className: string;
  slot?: TypeElement;
  mode?: 'in-out' | 'out-in' | 'default';
  display?: string;
  timer?: NodeJS.Timeout;

  constructor(public config: ITransitionConfig) {
    super();
    this.slot = config.slot;
    this.mode = config.mode;
    this.parent = config.parent;
    //   todo 处理 config
    this.setConfig();
  }

  setConfig() {
    console.log('Transition setConfig');
  }
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
        const { timeout } = getTransitionInfo(this.slot!.dom!);
        console.log('timeout is ', timeout);
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.slot?.setStyleObj({
            display: 'none',
          });
        }, timeout);
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
  beforeEnter(el: TypeElement) {
    if (this.config?.onBeforeEnter) {
      this.config.onBeforeEnter(el);
    } else {
      el.setStyleObj({
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
      });
    }
  }
  enter(el: TypeElement) {
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
  afterEnter(el: TypeElement) {
    if (this.config?.onAfterEnter) {
      this.config.onAfterEnter(el);
    } else {
      el.setStyleObj({
        opacity: el.styleObj.opacity,
      });
    }
  }
  beforeLeave(el: TypeElement) {
    if (this.config?.onBeforeLeave) {
      this.config.onBeforeLeave(el);
    } else {
      el?.setStyleObj({
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      });
    }
  }
  leave(el: TypeElement) {
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
  afterLeave(el: TypeElement) {
    // 要有定时器
    if (this.config?.onAfterLeave) {
      this.config.onAfterLeave(el);
    } else {
      el.setStyleObj({
        opacity: el.styleObj.opacity,
      })
    }
  }
  override render() {
    if (!this.slot) {
      throw Error('slot is not exist . ');
    }
    // todo 是否需要清理 parent 的dom子元素？？？
    if (this.slot instanceof TypeElement) {
      // this.slot.dom && this.beforeRender(this.slot);
      this.slot.render();
      if (!this.slot.dom) {
        throw Error('this.slot.dom is not exist . ');
      }
      const { display } = window.getComputedStyle(this.slot.dom);
      console.log(' display is ', display);
      this.display = display;
      this.elementParent?.dom?.appendChild(this.slot.dom);
    } else {
      throw Error('this.slot is not exist . ');
    }
  }
}
