import { ITypeConfig } from '../../../config.interface';
import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type {
  ITypeAttribute,
  ITypeProperty
} from '../../../type-element/type-element.interface';
import type { ISvgStop } from '../stop/stop.interface';
import { SvgDefs } from '../defs/defs.class';

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

export interface ISvgLinearGradientConfig extends ITypeConfig {
  parent: SvgDefs;
}
