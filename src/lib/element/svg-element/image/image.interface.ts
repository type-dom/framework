import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import { ITypeAttribute } from '../../../type-element';
import { IStyle } from '../../../style/style.interface';

/**
 * width
 * height
 * href
 */
export interface ISvgImageStyle extends Partial<IStyle> {
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string;
}

export interface ISvgImageAttribute extends Partial<ITypeAttribute> {
  width?: number | string;
  height?: number | string;
  href?: string; // white;
}

export interface ISvgImage extends ITypeSvg {
  nodeName: 'image';
  className: 'SvgImage';
  attrObj: Partial<ISvgImageAttribute>;
  styleObj: Partial<ISvgImageStyle>;
  childNodes: [];
}
