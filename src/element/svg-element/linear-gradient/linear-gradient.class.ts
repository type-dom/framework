import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgStop } from '../stop/stop.class';
import { SvgDefs } from '../defs/defs.class';
import { ISvgLinearGradient, ISvgLinearGradientPropObj } from './linear-gradient.interface';

export class SvgLinearGradient extends TypeSvg implements ISvgLinearGradient {
  nodeName: 'linearGradient';
  className: 'SvgLinearGradient';
  propObj: ISvgLinearGradientPropObj;
  dom: SVGLinearGradientElement;
  childNodes: SvgStop[];

  constructor(public parent: SvgDefs) {
    super('linearGradient');
    this.nodeName = 'linearGradient';
    this.className = 'SvgLinearGradient';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.propObj = {
      styleObj: {},
      attrObj: {
        id: 'linear-1',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      }
    };
    this.childNodes = [];
    this.events = [];
  }
  reset(id: string): void {
    this.setAttrObj({
      id,
    });
  }
}
