import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { addAttrObj, setAttrObj } from '../../../modules/attribute';
import type { ISvgStop } from './stop.interface';

export class SvgStop extends TypeSvg implements ISvgStop {
  nodeName: 'stop';
  className: 'SvgStop';
  dom: SVGStopElement;
  override props: SvgProps;
  // override attrObj: ISvgStopAttribute;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgProps) {
    super();
    this.nodeName = 'stop';
    this.className = 'SvgStop';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    addAttrObj(this, {
      offset: '0%',
      stopColor: '#000',
    });
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  reset(offset: number, stopColor: string): void {
    setAttrObj(this, {
      offset,
      stopColor,
    });
  }
}
