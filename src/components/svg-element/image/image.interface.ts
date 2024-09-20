import { IStyle } from '@type-dom/css-type';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import { ITypeAttribute } from '../../../index';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';

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
  childNodes: [];
}

export interface ISvgImageConfig extends ITypeConfig {
  attrObj?: ISvgImageAttribute;
  styleObj?: ISvgImageStyle;
}
