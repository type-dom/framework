import { IStyle, Property } from '@type-dom/css-type';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';

export interface ISvgPathStyle extends IStyle {
  fill?: Property.Fill; // white;
  stroke?: Property.Stroke; // red;
  strokeWidth?: Property.StrokeWidth; // 2
}

export interface ISvgPathAttribute extends ITypeAttribute {
  d?: string; // M250 150 L150 350 L350 350 Z
  fill?: string;
  strokeWidth?: number;
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
  className: 'SvgPath';
  childNodes: [];
}

export interface SvgPathProps extends TypeProps {
  styleObj?: ISvgPathStyle;
  attrObj?: ISvgPathAttribute;
}
