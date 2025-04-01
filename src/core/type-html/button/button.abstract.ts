import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeHtml } from '../type-html.abstract';
import { ITypeButton, TypeButtonProps } from './button.interface';

// 所有继承的具体类，应该统一成一个封装的自定义Button组件。
export abstract class TypeButton extends TypeHtml implements ITypeButton {
  abstract override className: string;
  props: TypeButtonProps;
  dom?: HTMLButtonElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'button',
    })
    // this.style.addObj(buttonStyle);
    this.attr.addObj({
      type: 'button'
    });
    this.childNodes = [new TextNode('')]; // 默认值
  }

  setTitle(title: string): void {
    this.textNode?.setText(title);
  }
}
