import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { ISvgClipPath } from './clip-path.interface';

// todo 有文字内容的
export class SvgClipPath extends TypeSvg implements ISvgClipPath {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  dom: SVGClipPathElement;
  override childNodes: TypeSvg[];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'clipPath';
    this.className = 'SvgClipPath';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'clipPath'
    );
    this.childNodes = [];
  }
}
