import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { ISvgG } from './g.interface';

export class SvgG extends TypeSvg implements ISvgG {
  nodeName: 'g';
  className: 'SvgG';
  dom: SVGGElement;
  override props: SvgProps;
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
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
