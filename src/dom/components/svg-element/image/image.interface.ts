import { CSSProperties } from '../../../modules/style/style.interface';
import type { ITypeSvg, SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';

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
  props?: SvgImageProps;
}

export interface SvgImageProps extends SvgProps {
  attrObj?: SvgProps['attrObj'] & { resourceId?: string | number; }
}
