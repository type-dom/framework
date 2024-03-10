import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import type { ISvgRadialGradient, ISvgRadialGradientConfig } from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  declare childNodes: SvgStop[];

  constructor(config?: Partial<ISvgRadialGradientConfig>) {
    super();
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.events = [];
    this.setConfig(config);
  }

  reset(id: string): void {
    this.setAttrObj({
      id
    });
  }
}
