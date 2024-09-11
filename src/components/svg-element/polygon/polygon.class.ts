import { TypeSvg } from '../../type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../type-svg/svg/svg.abstract';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ISvgPolygon } from './polygon.interface';

export class SvgPolygon extends TypeSvg implements ISvgPolygon {
  className: 'SvgPolygon';
  nodeName: 'polygon';
  dom: SVGPolygonElement;
  override parent?: TypeSvgSvg;
  override childNodes: [];

  constructor(params?: ITypeConfig) {
    super();
    this.nodeName = 'polygon';
    this.className = 'SvgPolygon';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];

    this.setProps(params);
  }
}
