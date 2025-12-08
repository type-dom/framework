/**
 * TypeHtml类是TypeElement的抽象子类，实现了ITypeHtml接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 * 将组件和dom的具体类型进行了关联；
 */
import { addStyleObj, setStyleObj } from '../../../dom/modules/style/style';
import { StyleValue } from '../../../dom/modules/style/style.interface';
import { HTMLAttributes } from '../../../dom/modules/attribute';
import { ToMaybeRefs } from '../../../reactivity';
import { TypeElement } from '../../type-element/type-element.abstract';
import type { ITypeHtml, HtmlProps } from './type-html.interface';

export abstract class TypeHtml<
    Props extends HtmlProps = HtmlProps,
    Attrs extends ToMaybeRefs<HTMLAttributes> = ToMaybeRefs<HTMLAttributes>,
    D extends HTMLElement = HTMLElement,
  >
  extends TypeElement<Props, Attrs>
  implements ITypeHtml
{
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom?: D; // 具体类构造阶段创建dom
  // timer?: ReturnType<typeof rAF> | undefined;
  // transitionTimer?: NodeJS.Timeout;

  constructor(params: Props = {} as Props) {
    super(params);
    // addAttrId(this, this.uid);
    // addAttrObj(this, {
    //   ['data-v-' + vHash]: '',
    // })
  }

  addStyleObj(styleObj?: StyleValue) {
    addStyleObj(this, styleObj);
  }

  setStyleObj(styleObj?: StyleValue) {
    setStyleObj(this, styleObj);
  }
}
