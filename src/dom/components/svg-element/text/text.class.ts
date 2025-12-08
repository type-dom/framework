import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { addAttrObj } from '../../../modules/attribute';
import { TextNode } from '../../text-node/text-node.class';
import type { ISvgText, } from './text.interface';

export class SvgText extends TypeSvg implements ISvgText {
  className: 'SvgText';
  nodeName: 'text';
  dom: SVGTextElement;
  // override attrObj: ISvgTextAttribute;
  override childNodes: TextNode[];
  // override textNode: TextNode;

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'text';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    this.className = 'SvgText';
    addAttrObj(this, {
      x: 0,
      y: 0,
    });
    this.childNodes = [];
    transformSlot(this, params.slot);
  }
}
