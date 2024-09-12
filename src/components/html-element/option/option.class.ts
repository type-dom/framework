import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeHtml } from '../../type-html/type-html.abstract';
import type { IOption, IOptionConfig } from './option.interface';

export class Option extends TypeHtml implements IOption {
  className: 'Option';
  nodeName: 'option';
  dom: HTMLOptionElement;
  override childNodes: TypeNode[];
  override props: IOptionConfig;
  override textNode: TextNode;

  constructor(params?: IOptionConfig) {
    super();
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Option';
    this.ctrl.addAttrName('option');
    this.textNode = new TextNode('一个选项');
    this.childNodes = [this.textNode];
    this.props = this.setProps(params);
  }
}
