import { SvgProps } from '../../../core/type-svg/type-svg.interface';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type { ISvgImage } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  override props: SvgProps;
  // override attrObj: ISvgImageAttribute;
  // override styleObj: ISvgImageStyle;
  override childNodes: [];

  override isBasic = true;

  constructor(params?: SvgProps) {
    super();
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params?.slot);
    this.props = this.useParams(params);
  }
}
