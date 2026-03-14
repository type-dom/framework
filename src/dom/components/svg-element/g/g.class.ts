import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { ISvgG } from './g.interface';

export class SvgG extends TypeSvg implements ISvgG {
  nodeName: 'g';
  className: 'SvgG';
  dom: SVGGElement;
  override childNodes: TypeSvg[];
  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'g';
    this.className = 'SvgG';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    this.childNodes = [];
  }
}
