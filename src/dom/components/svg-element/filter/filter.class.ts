import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { ISvgFilter } from './filter.interface';

export class SvgFilter extends TypeSvg implements ISvgFilter {
  nodeName: 'filter';
  className: 'SvgFilter';
  dom: SVGFilterElement;
  override childNodes: TypeSvg[];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'filter';
    this.className = 'SvgFilter';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'filter'
    );
    this.childNodes = [];
  }
}
