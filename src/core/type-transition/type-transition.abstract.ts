import type { ITransitionConfig } from '../../components/transition/transition.interface';
import { getTransitionInfo, nextFrame, resolveTransitionProps } from '../../components/transition/transition.util';
import { TypeFragment } from '../type-fragment/type-fragment.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import { ITypeTransition, ITypeTransitionConfig } from './type-transition.interface';

export abstract class TypeTransition extends TypeFragment implements ITypeTransition {
  mode: 'in-out' | 'out-in' | 'default';
  timer?: NodeJS.Timeout;
  override props: ITypeTransitionConfig;
  // 唯一子节点
  private content?: TypeHtml;

  constructor(params: ITransitionConfig = {}) {
    super();
    this.mode = params?.mode || 'in-out';
    this.parent = params?.parent;
    if (params.slot) {
      this.slotChild(params.slot);
      this.content = params.slot;
      // this.addChild(this.content);
      // 处理 params, to props
      // todo 如果是多个子节点，transition本身要成为一个 div 。
      //   现在只能有一个子节点。
      const props = resolveTransitionProps(params);
      console.log('props is ', props);
      params.slot.setTransitionProps(props);
    }
    this.props = this.useParams(params);
  }

  // override setup() {
  //   if (!this.content) {
  //     console.warn('Transition showSlot, el is undefined.');
  //     return;
  //   }
  //   // if (this.props.ifDom !== false || this.props.isShow !== false) {
  //   //   if (this.timer) {
  //   //     clearTimeout(this.timer as unknown as number);
  //   //   }
  //   //   // this.content.style?.setObj({
  //   //   //   display: display,
  //   //   // });
  //   //   this.beforeEnter(this.content);
  //   //   this.enter(this.content);
  //   //   this.afterEnter(this.content);
  //   // }
  //   // else {
  //   //   // this.beforeLeave(this.content);
  //   //   // this.leave(this.content);
  //   //   // this.afterLeave(this.content);
  //   //   //
  //   //   // nextFrame(() => {
  //   //   //   if (this.content?.dom) {
  //   //   //     const { timeout } = getTransitionInfo(this.content.dom!);
  //   //   //     console.log('timeout is ', timeout);
  //   //   //     if (this.timer) {
  //   //   //       clearTimeout(this.timer as unknown as number);
  //   //   //     }
  //   //   //     this.timer = setTimeout(() => {
  //   //   //       this.content?.style?.setObj({
  //   //   //         display: 'none',
  //   //   //       });
  //   //   //     }, timeout);
  //   //   //   }
  //   //   // });
  //   // }
  // }

  setContent(content: TypeHtml) {
    if (this.content) {
      this.replaceChildren(content);
    } else {
      this.addChild(content);
    }
    this.content = content;
  }

  // 显示、隐藏 slot
  showSlot(show: boolean, display = 'flex') {
    console.log('Transition showSlot, show is ', show);
    if (!this.content) {
      console.warn('Transition showSlot, el is undefined.');
      return;
    }
    if (show) {
      if (this.timer) {
        clearTimeout(this.timer as unknown as number);
      }
      this.content.style?.setObj({
        display: display,
      });
      this.beforeEnter(this.content);
      this.enter(this.content);
      this.afterEnter(this.content);
    } else {
      this.beforeLeave(this.content);
      this.leave(this.content);
      this.afterLeave(this.content);

      nextFrame(() => {
        if (this.content?.dom) {
          const { timeout } = getTransitionInfo(this.content);
          console.log('timeout is ', timeout);
          if (this.timer) {
            clearTimeout(this.timer as unknown as number);
          }
          this.timer = setTimeout(() => {
            this.content?.style?.setObj({
              display: 'none',
            });
          }, timeout);
        }
      });
    }
  }

  // 加载 slot，并挂载到父级dom上；
  loadSlot() {
    if (!this.content) {
      return;
    }
    this.beforeEnter(this.content);
    this.enter(this.content);
    this.afterEnter(this.content);
  }

  // 删除 slot
  deleteSlot() {
    if (!this.content) {
      return;
    }
    this.beforeLeave(this.content);
    this.leave(this.content);
    this.afterLeave(this.content);
  }

  beforeEnter(el: TypeHtml) {
    if (this.props.onBeforeEnter) {
      this.props.onBeforeEnter(el);
    } else {
      el.style?.setObj({
        opacity: 0,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  enter(el: TypeHtml) {
    if (this.props.onEnter) {
      this.props.onEnter(el, () => {
        console.log('enter , done . ');
      });
    } else {
      el.style?.setObj({
        opacity: 1,
      });
    }
  }

  afterEnter(el: TypeHtml) {
    if (this.props.onAfterEnter) {
      this.props.onAfterEnter(el);
    } else {
      el.style?.setObj({
        opacity: el.style?.get('opacity'),
      });
    }
  }

  beforeLeave(el: TypeHtml) {
    if (this.props.onBeforeLeave) {
      this.props.onBeforeLeave(el);
    } else {
      el?.style?.setObj({
        opacity: 1,
        transition: 'opacity 0.3s ease-' + this.mode,
      });
    }
  }

  leave(el: TypeHtml) {
    if (this.props.onLeave) {
      this.props.onLeave(el, () => {
        console.log('leave , done . ');
      });
    } else {
      el.style?.setObj({
        opacity: 0,
      });
    }
  }

  afterLeave(el: TypeHtml) {
    // 要有定时器
    if (this.props.onAfterLeave) {
      this.props.onAfterLeave(el);
    } else {
      el.style?.setObj({
        opacity: el.params.styleObj?.opacity,
      });
    }
  }
}
