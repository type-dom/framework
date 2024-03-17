import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { ISvgImage, ISvgImageAttribute, ISvgImageStyle } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  dom: SVGImageElement;
  override attrObj: ISvgImageAttribute;
  override styleObj: Partial<ISvgImageStyle>;
  override childNodes: [];

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.attrObj = {};
    this.styleObj = {};
    this.childNodes = [];
    this.setConfig(config);
  }
}
