import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type { ISvgCircle } from './circle.interface';
import { SvgProps } from '../../../core/type-svg/type-svg.interface';

export class SvgCircle extends TypeSvg implements ISvgCircle {
  nodeName: 'circle';
  className: 'SvgCircle';
  dom: SVGCircleElement;
  override childNodes: [];
  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'circle';
    this.className = 'SvgCircle';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
