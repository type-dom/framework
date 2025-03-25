import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import type {
  ISvgRadialGradient,
  SvgRadialGradientProps,
} from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  override props: SvgRadialGradientProps;
  override childNodes: SvgStop[];

  override isBasic = true;

  constructor(params: SvgRadialGradientProps = {}) {
    super();
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  reset(id: string): void {
    this.attr.setObj({
      id,
    });
  }
}
