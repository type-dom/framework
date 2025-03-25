import { TypeProps } from '../../../core/type-node/type-node.interface';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';
import type { ISvgStop } from '../stop/stop.interface';
import { SvgDefs } from '../defs/defs.class';

export interface ISvgLinearGradientAttribute extends ITypeAttribute {
  id?: string;
  x1?: number | string;
  y1?: number | string;
  x2?: number | string;
  y2?: number | string;
  spreadMethod?: string;
}

export interface ISvgLinearGradient extends ITypeSvg {
  nodeName: 'linearGradient';
  className: 'SvgLinearGradient';
  childNodes: ISvgStop[];
}

export interface SvgLinearGradientProps extends TypeProps {
  parent?: SvgDefs;
  attrObj?: ISvgLinearGradientAttribute;
}
