import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type {
  ISvgText,
  // ISvgTextAttribute,
  SvgTextProps,
} from './text.interface';

export class SvgText extends TypeSvg implements ISvgText {
  className: 'SvgText';
  nodeName: 'text';
  dom: SVGTextElement;
  // override attrObj: ISvgTextAttribute;
  override childNodes: TextNode[];
  // override textNode: TextNode;

  override isBasic = true;

  constructor(params: SvgTextProps) {
    super();
    this.nodeName = 'text';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.className = 'SvgText';
    this.attr.addObj({
      x: 0,
      y: 0,
    });
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
