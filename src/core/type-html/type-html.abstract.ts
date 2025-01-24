/**
 * TypeHtml类是TypeElement的抽象子类，实现了ITypeHtml接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 * 将组件和dom的具体类型进行了关联；
 */
import { IStyle } from '@type-dom/css-type';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import { getTransitionInfo, nextFrame } from '../../components/transition/transition.util';
import { Style } from '../style/style.class';
import { Attribute } from '../attribute/attribute.class';
import type { ITypeHtml, ITypeHtmlConfig } from './type-html.interface';

export abstract class TypeHtml<T extends HTMLElement = HTMLElement>
  extends TypeElement
  implements ITypeHtml
{
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom?: T; // 构造阶段不创建dom
  abstract override props: ITypeHtmlConfig;
  // private timer?: ReturnType<typeof rAF> | undefined;
  transitionTimer?: NodeJS.Timeout;
  style: Style;
  attr: Attribute;

  constructor() {
    super();
    this.style = new Style(this);
    this.attr = new Attribute(this);
    this.attr.addId(this.componentId);
  }

  addStyleObj(styleObj?: IStyle) {
    this.style.addObj(styleObj);
  }

  setStyleObj(styleObj?: IStyle) {
    this.style.setObj(styleObj);
  }

  addAttrObj(attrObj?: Record<string, string>) {
    this.attr.addObj(attrObj);
  }

  setAttrObj(attrObj?: Record<string, string>) {
    this.attr.setObj(attrObj);
  }

  override createDom() {
    // console.log('TypeHtml createDom');
    if (!this.dom) {
      this.dom = document.createElement(this.props.nodeName || 'div') as T;
    }
    // todo teleport to body 下面的方法无法挂载
    // this.parent?.elementParent?.dom?.appendChild(this.dom);
     if (this.transitionTimer) {
      clearTimeout(this.transitionTimer as unknown as number);
    }
    this.beforeEnter();
    this.enter();
    this.afterEnter();
  }

  override deleteDom() {
    this.beforeLeave();
    this.leave();
    this.afterLeave();
    nextFrame(() => {
      if (this.dom) {
        const { timeout } = getTransitionInfo(this);
        // console.log('timeout is ', timeout);
        if (this.transitionTimer) {
          clearTimeout(this.transitionTimer as unknown as number);
        }
        this.transitionTimer = setTimeout(() => {
          this.dom?.remove();
        }, timeout);
      }
    });
  }

  // 显示、隐藏 dom
  showDom(display = 'flex') {
    // console.log('TypeHtml showDom, show is ');
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer as unknown as number);
    }
    this.style.setObj({
      display: display,
    });
    this.beforeEnter();
    this.enter();
    this.afterEnter();
  }

  hideDom() {
    this.beforeLeave();
    this.leave();
    this.afterLeave();
    nextFrame(() => {
      if (this.dom) {
        const { timeout } = getTransitionInfo(this);
        // console.log('timeout is ', timeout);
        if (this.transitionTimer) {
          clearTimeout(this.transitionTimer as unknown as number);
        }
        this.transitionTimer = setTimeout(() => {
          this?.style?.setObj({
            // right: 0, // 否则会保留在原地
            display: 'none',
          });
        }, timeout);
      }
    });
  }

  beforeEnter() {
    if (this.transitionProps?.onBeforeEnter) {
      this.transitionProps?.onBeforeEnter(this);
    } else {
      this.style?.setObj({
        opacity: 0,
        transition: 'opacity 0.3s ease-' + this.transitionProps?.mode,
      });
    }
  }

  enter() {
    if (this.transitionProps?.onEnter) {
      this.transitionProps?.onEnter(this, () => {
        console.log('enter , done . ');
      });
    } else {
      this.style?.setObj({
        opacity: 1,
      });
    }
  }

  afterEnter() {
    if (this.transitionProps?.onAfterEnter) {
      this.transitionProps?.onAfterEnter(this);
    } else {
      this.style?.setObj({
        opacity: this.style?.get('opacity'),
      });
    }
  }

  beforeLeave() {
    if (this.transitionProps?.onBeforeLeave) {
      this.transitionProps?.onBeforeLeave(this);
    } else {
      this.style?.setObj({
        opacity: 1,
        transition: 'opacity 0.3s ease-' + this.transitionProps?.mode,
      });
    }
  }

  leave() {
    if (this.transitionProps?.onLeave) {
      this.transitionProps?.onLeave(this, () => {
        console.log('leave , done . ');
      });
    } else {
      this.style?.setObj({
        opacity: 0,
      });
    }
  }

  afterLeave() {
    // 要有定时器
    if (this.transitionProps?.onAfterLeave) {
      this.transitionProps.onAfterLeave(this);
    } else {
      this.style?.setObj({
        opacity: (this.params.styleObj as IStyle)?.opacity,
      });
    }
  }
}
