import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import type { ISvgCircle } from './circle.interface';

export class SvgCircle extends TypeSvg implements ISvgCircle {
  nodeName: 'circle';
  className: 'SvgCircle';
  dom: SVGCircleElement;
  override childNodes: [];

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'circle';
    this.className = 'SvgCircle';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.childNodes = [];
  }
}
