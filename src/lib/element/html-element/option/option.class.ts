import { TypeNode } from '../../../type-node/type-node.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import type { IOption, IOptionConfig } from './option.interface';

export class Option extends TypeHtml implements IOption {
  nodeName: 'option';
  className: 'Option';
  dom: HTMLOptionElement;
  override childNodes: TypeNode[];
  text: TextNode;

  constructor(config?: Partial<IOptionConfig>) {
    super();
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Option';
    this.attrObj = {
      name: 'option',
    };
    this.text = new TextNode('一个选项');
    this.childNodes = [this.text];
    this.setConfig(config);
  }

  // render(): void {
  //   console.error('option render . ');
  //   super.render();
  // }
}
