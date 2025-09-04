import { TypeLabel } from '../../../../core/components/type-html/label/label.abstract';
import { TypeLabelProps } from '../../../../core/components/type-html/label/label.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { addAttrName } from '../../../modules/attribute';
import { TextNode } from '../../text-node/text-node.class';
import type { Input } from '../input/input.class';
import type { ILabel } from './label.interface';

export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  override childNodes: (Input | TextNode)[];

  override isBasic = true;

  constructor(params: TypeLabelProps = {}) {
    super();
    this.className = 'Label';
    addAttrName(this, 'label');
    this.childNodes = [];
    transformSlot(this, params.slot);
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
