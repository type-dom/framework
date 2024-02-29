import type { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import type { ITypeProperty } from '../../../type-element/type-element.interface';
/**
 * width
 * height
 * href
 */
export interface ISvgImageProperty extends ITypeProperty {
  styleObj: {
    fontWeight?: string,
    fontSize?: string,
    fontFamily?: string,
  },
  attrObj: {
    width?: number | string,
    height?: number | string,
    href?: string; // white;
  }
}
export interface ISvgImage extends ITypeSvg {
  nodeName: 'image',
  className: 'SvgImage',
  propObj: ISvgImageProperty,
  childNodes: []
}
