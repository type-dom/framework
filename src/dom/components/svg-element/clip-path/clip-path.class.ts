import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { ISvgClipPath } from './clip-path.interface';

// todo 有文字内容的
export class SvgClipPath extends TypeSvg implements ISvgClipPath {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  dom: SVGClipPathElement;
  override childNodes: TypeSvg[];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'clipPath';
    this.className = 'SvgClipPath';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'clipPath'
    );
    this.childNodes = [];
    transformSlot(this, params.slot);
  }
}
