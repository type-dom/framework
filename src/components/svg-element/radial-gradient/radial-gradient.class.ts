import { TypeSvg } from '../../type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import type {
  ISvgRadialGradient,
  ISvgRadialGradientConfig,
} from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  override props: ISvgRadialGradientConfig;
  override childNodes: SvgStop[];

  constructor(params?: ISvgRadialGradientConfig) {
    super();
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.subscriptions = [];
    this.props = this.setParams(params);
  }

  reset(id: string): void {
    this.ctrl.setAttrObj({
      id,
    });
  }
}
