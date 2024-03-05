import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type {
  ITypeAttribute,
  ITypeProperty,
} from '../../../type-element/type-element.interface';
import type { ISvgStop } from '../stop/stop.interface';

export interface ISvgLinearGradientAttribute extends ITypeAttribute {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  spreadMethod?: string;
}

export interface ISvgLinearGradientPropObj extends ITypeProperty {
  attrObj: ISvgLinearGradientAttribute;
}

export interface ISvgLinearGradient extends ITypeSvg {
  nodeName: 'linearGradient';
  propObj: ISvgLinearGradientPropObj;
  className: 'SvgLinearGradient';
  childNodes: ISvgStop[];
}
