import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISvgImage } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  // override attrObj: ISvgImageAttribute;
  // override styleObj: ISvgImageStyle;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );
    this.childNodes = [];
    transformSlot(this, params?.slot);
  }
}
