import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { addAttrObj, setAttrObj } from '../../../modules/attribute';
import { SvgStop } from '../stop/stop.class';
import type { ISvgLinearGradient, } from './linear-gradient.interface';

export class SvgLinearGradient extends TypeSvg implements ISvgLinearGradient {
  nodeName: 'linearGradient';
  dom: SVGLinearGradientElement;
  className: 'SvgLinearGradient';
  // override attrObj: ISvgLinearGradientAttribute;
  override childNodes: SvgStop[];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'linearGradient';
    this.className = 'SvgLinearGradient';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient'
    );
    addAttrObj(this, {
      id: 'linear-1',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });
    this.childNodes = [];
  }

  reset(id: string): void {
    setAttrObj(this, {
      id,
    });
  }
}
