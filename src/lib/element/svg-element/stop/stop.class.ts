import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgRadialGradient } from '../radial-gradient/radial-gradient.class';
import { SvgLinearGradient } from '../linear-gradient/linear-gradient.class';
import type { ISvgStop, ISvgStopAttribute } from './stop.interface';
import { IStyle } from '../../../style/style.interface';

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  override attrObj: ISvgStopAttribute;
  override childNodes: [];

  constructor(public override parent: SvgLinearGradient | SvgRadialGradient) {
    super();
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attrObj = {
      offset: '0%',
      stopColor: '#000',
    };
    this.events = [];
  }

  reset(offset: number, stopColor: string): void {
    this.setAttrObj({
      offset,
      stopColor,
    });
  }
}
