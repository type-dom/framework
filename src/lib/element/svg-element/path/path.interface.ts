import type {
  ITypeAttribute
} from '../../../type-element/type-element.interface';
import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type { IStyle } from '../../../style/style.interface';

export interface ISvgPathStyle extends IStyle {
  fill: string; // white;
  stroke: string; // red;
  strokeWidth: number; // 2
}

export interface ISvgPathAttribute extends ITypeAttribute {
  d: string; // M250 150 L150 350 L350 350 Z
  fill: string;
  strokeWidth: number;
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'; // Default value	nonzero
}

/**
 * <path> 标签用来定义路径。
 *
 * 下面的命令可用于路径数据：
 *  M = moveto
 *  L = lineto
 *  H = horizontal lineto
 *  V = vertical lineto
 *  C = curveto
 *  S = smooth curveto
 *  Q = quadratic Belzier curve
 *  T = smooth quadratic Belzier curveto
 *  A = elliptical Arc
 *  Z = closepath
 *  注释：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
 */
export interface ISvgPath extends ITypeSvg {
  nodeName: 'path';
  styleObj: Partial<ISvgPathStyle>;
  attrObj: Partial<ISvgPathAttribute>;
  className: 'SvgPath';
  childNodes: [];
}
