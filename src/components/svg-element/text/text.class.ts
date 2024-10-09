import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeSvgSvg } from '../../../core/type-svg/svg/svg.abstract';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type {
  ISvgText,
  ISvgTextAttribute,
  ISvgTextConfig,
} from './text.interface';

export class SvgText extends TypeSvg implements ISvgText {
  nodeName: 'text';
  dom: SVGTextElement;
  className: 'SvgText';
  // override attrObj: ISvgTextAttribute;
  override childNodes: TextNode[];
  override parent?: TypeSvgSvg;
  override textNode: TextNode;

  constructor(params: ISvgTextConfig) {
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
    this.textNode = new TextNode();
    this.childNodes = [this.textNode];
    if (params.text) {
      this.textNode.setText(params.text);
    }
    this.useParams(params);
  }
}
