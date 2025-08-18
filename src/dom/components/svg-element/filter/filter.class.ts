import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { ISvgFilter } from './filter.interface';

export class SvgFilter extends TypeSvg implements ISvgFilter {
  nodeName: 'filter';
  className: 'SvgFilter';
  dom: SVGFilterElement;
  override props: SvgProps;
  override childNodes: TypeSvg[];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'filter';
    this.className = 'SvgFilter';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
