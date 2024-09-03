import { TypeSvg } from '../../type-svg/type-svg.abstract';
import { SvgRadialGradient } from '../radial-gradient/radial-gradient.class';
import { SvgLinearGradient } from '../linear-gradient/linear-gradient.class';
import type { ISvgStop, ISvgStopAttribute } from './stop.interface';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  override parent?: SvgLinearGradient | SvgRadialGradient;
  // override attrObj: ISvgStopAttribute;
  override childNodes: [];
  constructor(params: ITypeConfig) {
    super();
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.ctrl.addAttrObj({
      offset: '0%',
      stopColor: '#000',
    });
    this.setParams(params);
  }

  reset(offset: number, stopColor: string): void {
    this.ctrl.setAttrObj({
      offset,
      stopColor,
    });
  }
}
