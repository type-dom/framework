import type {
  ITypeAttribute
} from '../../../type-element/type-element.interface';
import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type { IStyle } from '../../../style/style.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSvg } from '../../../type-element';

/**
 * cx 属性定义圆点的 x 坐标
 * cy 属性定义圆点的 y 坐标
 * rx 属性定义水平半径
 * ry 属性定义垂直半径
 */
export interface ISvgEllipseStyle extends IStyle {
  fill: string; // rgb(200,100,50)
  stroke: string; // rgb(0,0,0) pink
  strokeWidth: number;
  strokeOpacity: number; // 0.9
  opacity: number; // 0.9
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
  styleObj: Partial<ISvgEllipseStyle>;
  attrObj: Partial<ISvgEllipseAttribute>;
  childNodes: [];
}

export interface ISvgEllipseConfig extends ITypeConfig {
  parent: TypeSvg;
}
