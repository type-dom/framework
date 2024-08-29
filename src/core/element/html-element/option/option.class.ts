import { TypeNode } from '../../../type-node/type-node.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-html/type-html.abstract';
import type { IOption, IOptionConfig } from './option.interface';

export class Option extends TypeHtml implements IOption {
  className: 'Option';
  nodeName: 'option';
  dom: HTMLOptionElement;
  override childNodes: TypeNode[];
  override textNode: TextNode;

  constructor(config?: Partial<IOptionConfig>) {
    super();
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Option';
    this.attrObj = {
      name: 'option',
    };
    this.textNode = new TextNode('一个选项');
    this.childNodes = [this.textNode];
    this.setConfig(config);
  }

  // render(): void {
  //   console.error('option render . ');
  //   super.render();
  // }
}
