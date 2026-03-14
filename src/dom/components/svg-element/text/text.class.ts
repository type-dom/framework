import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { addAttrObj } from '../../../modules/attribute';
import { TextNode } from '../../text-node/text-node.class';
import type { ISvgText, } from './text.interface';

export class SvgText extends TypeSvg implements ISvgText {
  className: 'SvgText';
  nodeName: 'text';
  dom: SVGTextElement;
  override childNodes: TextNode[];

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
  }
}
