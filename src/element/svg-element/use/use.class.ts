import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import type { ISvgUse } from './use.interface';
export class SvgUse extends TypeSvg implements ISvgUse {
  nodeName: 'use';
  className: 'SvgUse';
  dom: SVGUseElement;
  declare childNodes: [];
  constructor(public parent?: TypeSvgSvg) {
    super();
    this.nodeName = 'use';
    this.className = 'SvgUse';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
  }
}
