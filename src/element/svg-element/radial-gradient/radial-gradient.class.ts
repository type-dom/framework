import {TypeSvg} from "../../../type-element/type-svg/type-svg.abstract";
import { SvgStop } from '../stop/stop.class';
import { SvgDefs } from '../defs/defs.class';
import { ISvgRadialGradient } from './radial-gradient.interface';

export class SvgRadialGradient extends TypeSvg implements ISvgRadialGradient {
  nodeName: 'radialGradient';
  className: 'SvgRadialGradient';
  dom: SVGRadialGradientElement;
  childNodes: SvgStop[];

  constructor(public parent: SvgDefs) {
    super('radialGradient');
    this.nodeName = 'radialGradient';
    this.className = 'SvgRadialGradient';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.events = [];
  }
  reset(id: string): void {
    this.setAttrObj({
      id,
    });
  }
}
