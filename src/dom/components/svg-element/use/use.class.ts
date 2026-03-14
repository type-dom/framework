import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import type { ISvgUse } from './use.interface';

export class SvgUse extends TypeSvg implements ISvgUse {
  className: 'SvgUse';
  nodeName: 'use';
  dom: SVGUseElement;
  override childNodes: [];
  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'use';
    this.className = 'SvgUse';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'use'
    );
    this.childNodes = [];
  }
}
