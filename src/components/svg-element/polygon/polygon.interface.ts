import type { ITypeSvg } from '../../type-svg/type-svg.interface';

export interface ISvgPolygon extends ITypeSvg {
  nodeName: 'polygon';
  className: 'SvgPolygon';
  childNodes: [];
}
