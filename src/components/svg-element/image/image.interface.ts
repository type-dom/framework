import { CSSProperties } from '../../../core/style/style.interface';
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

/**
 * width
 * height
 * href
 */
export interface ISvgImageStyle extends CSSProperties {
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string;
}

// export interface ISvgImageAttribute extends ITypeAttribute {
//   width?: number | string;
//   height?: number | string;
//   href?: string; // white;
// }

export interface ISvgImage extends ITypeSvg {
  nodeName: 'image';
  className: 'SvgImage';
  childNodes: [];
}
