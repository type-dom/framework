import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgG } from './g.interface';

export class SvgG extends TypeSvg implements ISvgG {
  nodeName: 'g';
  className: 'SvgG';
  dom: SVGGElement;
  declare childNodes: TypeSvg[];

  constructor(public parent: TypeSvg) {
    super();
    this.nodeName = 'g';
    this.className = 'SvgG';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
  }
}
