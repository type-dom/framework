import { IStyle } from '@type-dom/css-type';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';

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

export interface SvgImageProps extends TypeProps {
  attrObj?: ISvgImageAttribute;
  styleObj?: ISvgImageStyle;
}
