import type { ITypeSvg } from '../../../../core/components/type-svg/type-svg.interface';

export interface ISvgPolygon extends ITypeSvg {
  nodeName: 'polygon';
  className: 'SvgPolygon';
  childNodes: [];
}
