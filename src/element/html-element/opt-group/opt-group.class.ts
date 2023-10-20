import { TypeNode } from '../../../type-node/type-node.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSelect } from '../../../type-element/type-html/select/select.abstract';
import { IOptGroup } from './opt-group.interface';
export class OptGroup extends TypeHtml implements IOptGroup {
  nodeName: 'optgroup';
  className: 'OptGroup';
  dom: HTMLOptGroupElement;
  childNodes: TypeNode[];
  text: TextNode;
  constructor(public parent: TypeSelect) {
    super();
    this.nodeName = 'optgroup';
    this.dom = document.createElement(this.nodeName);
    this.className = 'OptGroup';
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
