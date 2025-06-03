import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type { ISvgStop } from './stop.interface';
import { TypeProps } from '../../../core/type-node/type-node.interface';

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  // override attrObj: ISvgStopAttribute;
  override childNodes: [];

  override isBasic = true;

  constructor(params: TypeProps) {
    super();
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attr.addObj({
      offset: '0%',
      stopColor: '#000',
    });
    this.slotChildren(params.slot);
    this.useParams(params);
  }

  reset(offset: number, stopColor: string): void {
    this.attr.setObj({
      offset,
      stopColor,
    });
  }
}
