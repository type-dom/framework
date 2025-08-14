import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

export interface ISvgStop extends ITypeSvg {
  nodeName: 'stop';
  className: 'SvgStop';
  // attrObj: ISvgStopAttribute;
  childNodes: [];
}
