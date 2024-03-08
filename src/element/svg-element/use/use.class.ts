import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import type { ISvgUse } from './use.interface';
import { ITypeConfig } from '../../../config.interface';

export class SvgUse extends TypeSvg implements ISvgUse {
  className: 'SvgUse';
  nodeName: 'use';
  // declare parent?: TypeSvgSvg;
  dom: SVGUseElement;
  declare childNodes: [];

  constructor(config: ITypeConfig) {
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
