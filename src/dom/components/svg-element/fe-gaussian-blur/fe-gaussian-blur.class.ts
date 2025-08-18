import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import type {
  ISvgFeGaussianBlur,
} from './fe-gaussian-blur.interface';

export class SvgFeGaussianBlur extends TypeSvg implements ISvgFeGaussianBlur {
  nodeName: 'feGaussianBlur';
  className: 'SvgFeGaussianBlur';
  dom: SVGFEGaussianBlurElement;
  override props: SvgProps;
  override childNodes: [];

  override isBasic = true;

  constructor(params?: SvgProps) {
    super();
    this.nodeName = 'feGaussianBlur';
    this.className = 'SvgFeGaussianBlur';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params?.slot);
    this.props = this.useParams(params);
  }
}
