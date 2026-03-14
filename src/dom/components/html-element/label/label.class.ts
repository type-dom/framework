import { TypeLabel } from '../../../../core/abstracts/type-html/label/label.abstract';
import { LabelProps } from '../../../../core/abstracts/type-html/label/label.interface';
import { addAttrName } from '../../../modules/attribute';
import { TextNode } from '../../text-node/text-node.class';
import type { Input } from '../input/input.class';
import type { ILabel } from './label.interface';

export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  override childNodes: (Input | TextNode)[];
  constructor(params: LabelProps = {}) {
    super(params);
    this.className = 'Label';
    addAttrName(this, 'label');
    this.childNodes = [];
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
