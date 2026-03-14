import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import type { ISvgPolygon } from './polygon.interface';

export class SvgPolygon extends TypeSvg implements ISvgPolygon {
  className: 'SvgPolygon';
  nodeName: 'polygon';
  dom: SVGPolygonElement;
  override childNodes: [];
  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'polygon';
    this.className = 'SvgPolygon';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    this.childNodes = [];

  }
}
