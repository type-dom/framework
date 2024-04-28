import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import type { ISvgLine, ISvgLineAttribute } from './line.interface';

export class SvgLine extends TypeSvg implements ISvgLine {
  nodeName: 'line';
  className: 'SvgLine';
  dom: SVGLineElement;
  override attrObj: ISvgLineAttribute;
  override childNodes: [];
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'line';
    this.className = 'SvgLine';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attrObj = {
      strokeWidth: 1,
      stroke: '#000',
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
    };
    this.setConfig(config);
  }

  reset(x1: number, y1: number, x2: number, y2: number): SvgLine {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.setAttrObj({
      x1,
      y1,
      x2,
      y2,
    });
    return this;
  }
}
