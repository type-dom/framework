import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import type {
  ISvgLinearGradient, ISvgLinearGradientAttribute, ISvgLinearGradientConfig,
} from './linear-gradient.interface';

export class SvgLinearGradient extends TypeSvg implements ISvgLinearGradient {
  nodeName: 'linearGradient';
  dom: SVGLinearGradientElement;
  className: 'SvgLinearGradient';
  override attrObj: ISvgLinearGradientAttribute;
  override childNodes: SvgStop[];

  constructor(config?: Partial<ISvgLinearGradientConfig>) {
    super();
    this.nodeName = 'linearGradient';
    this.className = 'SvgLinearGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.attrObj = {
      id: 'linear-1',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    this.childNodes = [];
    this.events = [];
    this.setConfig(config);
  }

  reset(id: string): void {
    this.setAttrObj({
      id,
    });
  }
}
