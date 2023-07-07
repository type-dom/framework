import { SvgRadialGradient } from '../radial-gradient/radial-gradient.class';
import { SvgLinearGradient } from '../linear-gradient/linear-gradient.class';
import { ISvgStop, ISvgStopProperty } from './stop.interface';
import {TypeSvg} from "../../../type-element/type-svg/type-svg.abstract";

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  propObj: ISvgStopProperty;
  childNodes: [];

  constructor(public parent: SvgLinearGradient | SvgRadialGradient) {
    super('stop');
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {},
      attrObj: {
        offset: '0%',
        stopColor: '#000',
      }
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
