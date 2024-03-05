import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgClipPath } from './clip-path.interface';

// todo 有文字内容的
export class SvgClipPath extends TypeSvg implements ISvgClipPath {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  dom: SVGClipPathElement;
  declare childNodes: TypeSvg[];

  constructor(public parent: TypeSvg) {
    super();
    this.nodeName = 'clipPath';
    this.className = 'SvgClipPath';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    // this.textNode = new WebTextNode(this, '字');
    this.childNodes = [];
  }
}
