import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import type { ISvgUse } from './use.interface';

export class SvgUse extends TypeSvg implements ISvgUse {
  className: 'SvgUse';
  nodeName: 'use';
  dom: SVGUseElement;
  override parent?: TypeSvgSvg;
  override childNodes: [];

  constructor(config: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'use';
    this.className = 'SvgUse';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.setConfig(config);
  }
}
