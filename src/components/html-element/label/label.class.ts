import { TextNode } from '../../../core/text-node/text-node.class';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeLabel } from '../../../core/type-html/label/label.abstract';
import type { Input } from '../input/input.class';
import type { ILabel } from './label.interface';

export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  override childNodes: (Input | TextNode)[];

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Label';
    this.attr.addName('label');
    this.childNodes = [];
    this.slotChild(params.slot);
    this.useParams(params);
  }

  // createInstance(labelLiteral: ILabel): void {
  // this.attr.resetObj(labelLiteral.attrObj);
  // this.style.resetObj(labelLiteral.styleObj);
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
