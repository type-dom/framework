import { SvgProps } from '../../../core/type-svg/type-svg.interface';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { ISvgG } from './g.interface';

export class SvgG extends TypeSvg implements ISvgG {
  nodeName: 'g';
  className: 'SvgG';
  dom: SVGGElement;
  override childNodes: TypeSvg[];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'g';
    this.className = 'SvgG';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
