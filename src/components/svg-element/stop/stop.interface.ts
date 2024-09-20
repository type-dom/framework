import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import type { ITypeAttribute } from '../../../core/type-element/type-element.interface';

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
