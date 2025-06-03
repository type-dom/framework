import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import type { ISvgCircle } from './circle.interface';

export class SvgCircle extends TypeSvg implements ISvgCircle {
  nodeName: 'circle';
  className: 'SvgCircle';
  dom: SVGCircleElement;
  override childNodes: [];
  override isBasic = true;

  constructor(params: TypeProps = {}) {
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
