import { SvgProps } from '../../../core/type-svg/type-svg.interface';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import type {
  ISvgLinearGradient,
} from './linear-gradient.interface';

export class SvgLinearGradient extends TypeSvg implements ISvgLinearGradient {
  nodeName: 'linearGradient';
  dom: SVGLinearGradientElement;
  className: 'SvgLinearGradient';
  override props: SvgProps;
  // override attrObj: ISvgLinearGradientAttribute;
  override childNodes: SvgStop[];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'linearGradient';
    this.className = 'SvgLinearGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.attr.addObj({
      id: 'linear-1',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });
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
