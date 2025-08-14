import { SvgProps } from '../../../core/type-svg/type-svg.interface';
import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type { ISvgUse } from './use.interface';

export class SvgUse extends TypeSvg implements ISvgUse {
  className: 'SvgUse';
  nodeName: 'use';
  dom: SVGUseElement;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'use';
    this.className = 'SvgUse';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
