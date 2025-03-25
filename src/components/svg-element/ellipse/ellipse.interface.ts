import { IStyle, Property } from '@type-dom/css-type';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSvg } from '../../../index';

/**
 * cx 属性定义圆点的 x 坐标
 * cy 属性定义圆点的 y 坐标
 * rx 属性定义水平半径
 * ry 属性定义垂直半径
 */
export interface ISvgEllipseStyle extends IStyle {
  fill?: string; // rgb(200,100,50)
  stroke?: string; // rgb(0,0,0) pink
  strokeWidth?: Property.StrokeWidth;
  strokeOpacity?: Property.StrokeOpacity; // 0.9
  opacity?: Property.Opacity; // 0.9
}

export interface ISvgEllipseAttribute extends ITypeAttribute {
  fill: string; // rgb(200,100,50)
  stroke?: string; // rgb(0,0,0) pink
  strokeWidth: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface ISvgEllipse extends ITypeSvg {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  childNodes: [];
}

export interface SvgEllipseProps extends TypeProps {
  parent: TypeSvg;
  styleObj?: ISvgEllipseStyle;
  attrObj?: ISvgEllipseAttribute;
}
