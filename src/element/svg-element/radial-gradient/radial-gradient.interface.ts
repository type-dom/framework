import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type { ITypeAttribute } from '../../../type-element/type-element.interface';
import type { ISvgStop } from '../stop/stop.interface';

// cx, cy 和 r 属性定义了最外面的圆，fx 和 fy 定义了最里面的圆
export interface IRadialGradientAttribute extends ITypeAttribute {
  cx: string;
  cy: string;
  r: string;
  fx: string;
  fy: string;
  spreadMethod?: string;
}

export interface ISvgRadialGradient extends ITypeSvg {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  childNodes: ISvgStop[];
}
