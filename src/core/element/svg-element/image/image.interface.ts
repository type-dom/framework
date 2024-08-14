import { IStyle } from '@type-dom/css-type';
import type { ITypeSvg } from '../../../type-svg/type-svg.interface';
import { ITypeAttribute } from '../../../index';

/**
 * width
 * height
 * href
 */
export interface ISvgImageStyle extends IStyle {
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string;
}

export interface ISvgImageAttribute extends ITypeAttribute {
  width?: number | string;
  height?: number | string;
  href?: string; // white;
}

export interface ISvgImage extends ITypeSvg {
  nodeName: 'image';
  className: 'SvgImage';
  attrObj: ISvgImageAttribute;
  styleObj: ISvgImageStyle;
  childNodes: [];
}
