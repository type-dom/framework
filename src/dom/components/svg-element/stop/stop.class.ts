import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { addAttrObj, setAttrObj } from '../../../modules/attribute';
import type { ISvgStop } from './stop.interface';

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  // override attrObj: ISvgStopAttribute;
  override childNodes: [];


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'stop'
    );
    this.childNodes = [];
    addAttrObj(this, {
      offset: '0%',
      stopColor: '#000',
    });
  }

  reset(offset: number, stopColor: string): void {
    setAttrObj(this, {
      offset,
      stopColor,
    });
  }
}
