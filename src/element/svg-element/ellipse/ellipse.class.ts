import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgEllipse, ISvgEllipseProperty } from './ellipse.interface';

export class SvgEllipse extends TypeSvg implements ISvgEllipse {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  declare propObj: ISvgEllipseProperty;
  declare childNodes: [];
  cx: number = 0;
  cy: number = 0;
  rx: number = 0;
  ry: number = 0;
  constructor(public parent: TypeSvg) {
    super('ellipse');
    this.nodeName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {},
      attrObj: {
        fill: 'none',
        stroke: '#000',
        strokeWidth: 1,
        cx: this.cx,
        cy: this.cy,
        rx: this.rx,
        ry: this.ry
      }
    };
  }

  reset(cx: number, cy: number, rx: number, ry: number): SvgEllipse {
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
