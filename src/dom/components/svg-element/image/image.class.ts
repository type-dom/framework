import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import type { ISvgImage, SvgImageProps } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg<SvgImageProps> implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  // override attrObj: ISvgImageAttribute;
  // override styleObj: ISvgImageStyle;
  override childNodes: [];

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );
    this.childNodes = [];
  }
}
