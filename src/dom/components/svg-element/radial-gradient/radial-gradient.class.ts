import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { setAttrObj } from '../../../modules/attribute';
import { SvgStop } from '../stop/stop.class';
import type { ISvgRadialGradient, } from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  override props: SvgProps;
  override childNodes: SvgStop[];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }

  reset(id: string): void {
    setAttrObj(this, {
      id,
    });
  }
}
