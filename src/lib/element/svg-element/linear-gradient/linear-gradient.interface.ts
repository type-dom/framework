import { ITypeConfig } from '../../../config.interface';
import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type {
  ITypeAttribute,
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

export interface ISvgLinearGradient extends ITypeSvg {
  nodeName: 'linearGradient';
  attrObj: ISvgLinearGradientAttribute;
  className: 'SvgLinearGradient';
  childNodes: ISvgStop[];
}

export interface ISvgLinearGradientConfig extends ITypeConfig {
  parent: SvgDefs;
}
