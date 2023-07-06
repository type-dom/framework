import {TypeSvg} from "../../../type-element/type-svg/type-svg.abstract";
import {TypeSvgSvg} from "../../../type-element/type-svg/svg/svg.abstract";
import { ISvgImage, ISvgImageProperty } from './image.interface';

/**
 * image标签
 */
export class SvgImage extends TypeSvg implements ISvgImage {
  nodeName: 'image';
  className: 'SvgImage';
  propObj: ISvgImageProperty;
  dom: SVGImageElement;
  childNodes: [];
  constructor(public parent: TypeSvgSvg) {
    super('image');
    this.nodeName = 'image';
    this.className = 'SvgImage';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.propObj = {
      styleObj: {},
      attrObj: {
        // x: 0,
        // y: 0,
      }
    };
    this.childNodes = [];
  }
}
