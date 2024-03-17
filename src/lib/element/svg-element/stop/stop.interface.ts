import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type {
  ITypeAttribute
} from '../../../type-element/type-element.interface';
import type { IStyle } from '../../../style/style.interface';

/**
 */
export interface ISvgStopAttribute extends ITypeAttribute {
  offset: string; // 0%  100%
  stopColor: string;
}

export interface ISvgStop extends ITypeSvg {
  nodeName: 'stop';
  className: 'SvgStop';
  attrObj: ISvgStopAttribute;
  childNodes: [];
}
