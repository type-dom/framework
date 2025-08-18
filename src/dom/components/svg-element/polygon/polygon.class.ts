import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import type { ISvgPolygon } from './polygon.interface';

export class SvgPolygon extends TypeSvg implements ISvgPolygon {
  className: 'SvgPolygon';
  nodeName: 'polygon';
  dom: SVGPolygonElement;
  override props: SvgProps;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'polygon';
    this.className = 'SvgPolygon';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];

    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
