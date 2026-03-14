import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { setAttrObj } from '../../../modules/attribute';
import { SvgStop } from '../stop/stop.class';
import type { ISvgRadialGradient, } from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  override childNodes: SvgStop[];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'radialGradient'
    );
    this.childNodes = [];
  }

  reset(id: string): void {
    setAttrObj(this, {
      id,
    });
  }
}
