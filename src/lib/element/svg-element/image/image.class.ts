import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { ISvgImage, ISvgImageProperty } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  declare propObj: ISvgImageProperty;
  dom: SVGImageElement;
  declare childNodes: [];

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.setConfig(config);
  }
}
