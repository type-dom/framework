import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import type { ISvgDefs } from './defs.interface';

// todo 有文字内容的
export class SvgDefs extends TypeSvg implements ISvgDefs {
  nodeName: 'defs';
  className: 'SvgDefs';
  dom: SVGDefsElement;
  declare childNodes: TypeSvg[];

  constructor(public parent?: TypeSvgSvg) {
    super();
    this.nodeName = 'defs';
    this.className = 'SvgDefs';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    // this.textNode = new WebTextNode(this, '字');
    this.childNodes = [];
  }
}
