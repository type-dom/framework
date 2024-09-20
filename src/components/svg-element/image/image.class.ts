import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type {
  ISvgImage,
  ISvgImageAttribute, ISvgImageConfig,
  ISvgImageStyle
} from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  override props: ISvgImageConfig;
  // override attrObj: ISvgImageAttribute;
  // override styleObj: ISvgImageStyle;
  override childNodes: [];

  constructor(params?: ISvgImageConfig) {
    super();
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.props = this.useParams(params);
  }
}
