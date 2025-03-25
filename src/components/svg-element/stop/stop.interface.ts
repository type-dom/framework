import { ITypeAttribute } from '../../../core/attribute/attribute.interface';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

/**
 */
export interface ISvgStopAttribute extends ITypeAttribute {
  offset: string; // 0%  100%
  stopColor: string;
}

export interface ISvgStop extends ITypeSvg {
  nodeName: 'stop';
  className: 'SvgStop';
  // attrObj: ISvgStopAttribute;
  childNodes: [];
}
