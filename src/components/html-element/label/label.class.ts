import { TextNode } from '../../../core/text-node/text-node.class';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeLabel } from '../../type-html/label/label.abstract';
import type { Input } from '../input/input.class';
import type { ILabel } from './label.interface';

export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  override childNodes: (Input | TextNode)[];
  override textNode?: TextNode;

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Label';
    this.ctrl.addAttrName('label');
    // this.textNode = new TextNode();
    this.childNodes = [];
    this.setProps(params);
  }

  // createInstance(labelLiteral: ILabel): void {
  // this.ctrl.resetAttrObj(labelLiteral.attrObj);
  // this.ctrl.resetStyleObj(labelLiteral.styleObj);
  //   for (const idx in labelLiteral.childNodes) {
  //     if (this.childNodes[idx]) {
  //       this.childNodes[0].setText(labelLiteral.childNodes[0].nodeValue);
  //     } else {
  //       const child = new TextNode(this, labelLiteral.childNodes[0].nodeValue);
  //       this.appendChild(child);
  //     }
  //   }
  // }
}
