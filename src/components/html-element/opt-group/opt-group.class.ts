import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeHtml } from '../../type-html/type-html.abstract';
import type { IOptGroup, IOptGroupConfig } from './opt-group.interface';

export class OptGroup extends TypeHtml implements IOptGroup {
  className: 'OptGroup';
  override nodeName: 'optgroup';
  override dom: HTMLOptGroupElement;
  override childNodes: TypeNode[];
  override textNode: TextNode;
  override props: IOptGroupConfig
  constructor(params: IOptGroupConfig) {
    super();
    this.nodeName = 'optgroup';
    this.dom = document.createElement(this.nodeName);
    this.className = 'OptGroup';
    this.ctrl.addAttrName( 'option');
    this.textNode = new TextNode('一个选项');
    this.childNodes = [this.textNode];
    this.props = this.setParams(params);
  }

}
