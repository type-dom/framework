import { TypeNode } from '../../../type-node/type-node.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import type { IOptGroup, IOptGroupConfig } from './opt-group.interface';

export class OptGroup extends TypeHtml implements IOptGroup {
  nodeName: 'optgroup';
  className: 'OptGroup';
  dom: HTMLOptGroupElement;
  override childNodes: TypeNode[];
  text: TextNode;

  constructor(config: Partial<IOptGroupConfig>) {
    super();
    this.nodeName = 'optgroup';
    this.dom = document.createElement(this.nodeName);
    this.className = 'OptGroup';
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
