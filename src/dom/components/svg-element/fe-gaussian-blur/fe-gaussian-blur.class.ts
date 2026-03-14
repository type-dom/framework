import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import type {
  ISvgFeGaussianBlur,
} from './fe-gaussian-blur.interface';

export class SvgFeGaussianBlur extends TypeSvg implements ISvgFeGaussianBlur {
  nodeName: 'feGaussianBlur';
  className: 'SvgFeGaussianBlur';
  dom: SVGFEGaussianBlurElement;
  override childNodes: [];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'feGaussianBlur';
    this.className = 'SvgFeGaussianBlur';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feGaussianBlur'
    );
    this.childNodes = [];
  }
}
