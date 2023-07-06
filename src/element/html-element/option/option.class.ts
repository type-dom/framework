import { TypeNode } from '../../../type-node/type-node.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { Select } from '../select/select.class';
import { IOption } from './option.interface';
export class Option extends TypeHtml implements IOption {
  nodeName: 'option';
  className: 'Option';
  dom: HTMLOptionElement;
  childNodes: TypeNode[];
  text: TextNode;
  constructor(public parent: Select) {
    super('option');
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Option';
    this.propObj.attrObj = {
      name: 'option'
    };
    this.text = new TextNode(this, '一个选项');
    this.childNodes = [this.text];
  }
  // render(): void {
  //   console.error('option render . ');
  //   super.render();
  // }
}
