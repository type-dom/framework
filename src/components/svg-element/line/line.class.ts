import { TypeSvg } from '../../type-svg/type-svg.abstract';
import { ISvgLine, ISvgLineAttribute, ISvgLineConfig } from './line.interface';

export class SvgLine extends TypeSvg implements ISvgLine {
  nodeName: 'line';
  className: 'SvgLine';
  dom: SVGLineElement;
  override props: ISvgLineConfig;
  // override attrObj: ISvgLineAttribute;
  override childNodes: [];
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;

  constructor(params?: ISvgLineConfig) {
    super();
    this.nodeName = 'line';
    this.className = 'SvgLine';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.ctrl.addAttrObj({
      strokeWidth: 1,
      stroke: '#000',
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
    });
    this.props = this.setProps(params);
  }

  reset(x1: number, y1: number, x2: number, y2: number): SvgLine {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.ctrl.setAttrObj({
      x1,
      y1,
      x2,
      y2,
    });
    return this;
  }
}
