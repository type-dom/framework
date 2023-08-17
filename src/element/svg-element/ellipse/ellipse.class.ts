import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgEllipse, ISvgEllipseProperty } from './ellipse.interface';

export class SvgEllipse extends TypeSvg implements ISvgEllipse {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  // propObj: ISvgEllipseProperty;
  childNodes: [];
  cx: number | string = 0;
  cy: number | string = 0;
  rx: number | string = 0;
  ry: number | string = 0;

  constructor(public parent: TypeSvg) {
    super('ellipse');
    this.nodeName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.addAttrObj({
      fill: 'none',
      stroke: '#000',
      strokeWidth: 1,
      cx: this.cx,
      cy: this.cy,
      rx: this.rx,
      ry: this.ry
    });
  }

  reset(cx: string | number, cy: string | number, rx: string | number, ry: string | number): SvgEllipse {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.setAttrObj({
      cx,
      cy,
      rx,
      ry
    });
    return this;
  }
}
