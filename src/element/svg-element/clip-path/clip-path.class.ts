import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgClipPath } from './clip-path.interface';
export class SvgClipPath extends TypeSvg implements ISvgClipPath {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  dom: SVGClipPathElement;
  declare childNodes: TypeSvg[];
  constructor(public parent: TypeSvg) {
    super();
    this.nodeName = 'clipPath';
    this.className = 'SvgClipPath';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName) as SVGClipPathElement;
    this.childNodes = [];
  }
}
