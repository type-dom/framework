import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeHtml } from '../type-html.abstract';
import { buttonStyle } from './button.const';
import type { ITypeButton } from './button.interface';

// 所有继承的具体类，应该统一成一个封装的自定义Button组件。
export abstract class TypeButton extends TypeHtml implements ITypeButton {
  abstract override className: string;
  nodeName: 'button';
  dom: HTMLButtonElement;
  override textNode: TextNode;

  protected constructor() {
    super();
    this.nodeName = 'button';
    this.dom = document.createElement(this.nodeName);
    this.ctrl.addStyleObj(buttonStyle);
    this.ctrl.addAttrObj({
      type: 'button'
    })
    // this.props.attrObj = {
    //   type: 'button',
    // };
    this.textNode = new TextNode('');
    this.childNodes = [this.textNode]; // 默认值
  }

  setTitle(title: string): void {
    this.textNode.setText(title);
  }
}
