/**
 * <text x="10"  y="20"
 * style="font-family: Times New Roman;
 * font-size  : 24;
 * stroke     : #00ff00;
 * fill       : #0000ff;">
 * SVG text styling
 * </text>
 * transform="rotate(30 20,40)"
 */
import { IStyle, Property } from '@type-dom/css-type';
import type { ITextNode } from '../../../text-node/text-node.interface';
import type {
  ITypeAttribute,
  ITypeElement,
} from '../../../type-element/type-element.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';

export interface ISvgTextStyle extends IStyle {
  fontFamily?: Property.FontFamily; // rgb(0,0,255) blue
  // fontSize?: string;
  stroke?: Property.Stroke; // rgb(0,0,0) pink
  fill?: Property.Fill; // #0000ff;"
}

export interface ISvgTextAttribute extends ITypeAttribute {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  transform?: string;
}

export interface ISvgText extends ITypeElement {
  nodeName: 'text';
  styleObj: ISvgTextStyle;
  attrObj: ISvgTextAttribute;
  className: 'SvgText';
  childNodes: ITextNode[];
}

export interface ISvgTextConfig extends ITypeConfig {
  text: string;
}
