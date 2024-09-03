import { IStyle, Property } from '@type-dom/css-type';
import type { ITypeAttribute } from '../../../core/type-element/type-element.interface';
import type { ITypeSvg } from '../../type-svg/type-svg.interface';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';

/**
 * x1 属性在 x 轴定义线条的开始
 * y1 属性在 y 轴定义线条的开始
 * x2 属性在 x 轴定义线条的结束
 * y2 属性在 y 轴定义线条的结束
 */
export interface ISvgLineStyle extends IStyle {
  stroke?: string; // rgb(0,0,0) pink
  strokeWidth?: Property.StrokeWidth; // ICSSRule | ICSSPixelUnitRule;
  fillOpacity?: Property.FillOpacity; // 0.1
  strokeOpacity?: Property.StrokeOpacity; // 0.9
  opacity?: Property.Opacity; // 0.9
}

export interface ISvgLineAttribute extends ITypeAttribute {
  strokeWidth: number;
  stroke: string; // rgb(0,0,0) pink
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ISvgLine extends ITypeSvg {
  nodeName: 'line';
  className: 'SvgLine';
  childNodes: [];
}

export interface ISvgLineConfig extends ITypeConfig {
  styleObj?: ISvgLineStyle;
  attrObj?: ISvgLineAttribute;
}
