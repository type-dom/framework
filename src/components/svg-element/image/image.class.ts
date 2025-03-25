import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import type { ISvgImage, SvgImageProps } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  override props: SvgImageProps;
  // override attrObj: ISvgImageAttribute;
  // override styleObj: ISvgImageStyle;
  override childNodes: [];

  override isBasic = true;

  constructor(params?: SvgImageProps) {
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
