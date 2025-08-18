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
import type { ITextNode } from '../../text-node/text-node.interface';
import type { ITypeElement, } from '../../../../core/type-element/type-element.interface';

// export interface ISvgTextStyle extends CSSProperties {
//   fontFamily?: Property.FontFamily; // rgb(0,0,255) blue
//   // fontSize?: string;
//   stroke?: Property.Stroke; // rgb(0,0,0) pink
//   fill?: Property.Fill; // #0000ff;"
// }
//
// export interface ISvgTextAttribute extends ITypeAttribute {
//   x: number;
//   y: number;
//   dx?: number;
//   dy?: number;
//   transform?: string;
// }

export interface ISvgText extends ITypeElement {
  className: 'SvgText';
  nodeName: 'text';
  childNodes: ITextNode[];
}

// export interface SvgTextProps extends TypeProps {
//   text?: string;
//   // styleObj?: ISvgTextStyle;
//   attrObj?: SVGAttributes;
// }
