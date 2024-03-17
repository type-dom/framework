import { TextNode } from '../../../text-node/text-node.class';
import { ITypeConfig } from '../../../config.interface';
import { TypeLabel } from '../../../type-element/type-html/label/label.abstract';
import type { Input } from '../input/input.class';
import type { ILabel } from './label.interface';

export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  override childNodes: (Input | TextNode)[];
  textNode: TextNode;

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Label';
    this.attrObj = {
      name: 'label',
    };
    this.textNode = new TextNode();
    this.childNodes = [];
    this.setConfig(config);
  }

  // createInstance(labelLiteral: ILabel): void {
  // this.resetAttrObj(labelLiteral.attrObj);
  // this.resetStyleObj(labelLiteral.styleObj);
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
