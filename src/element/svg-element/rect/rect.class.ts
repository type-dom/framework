import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import type { ISvgRect, ISvgRectProperty } from './rect.interface';
export class SvgRect extends TypeSvg implements ISvgRect {
  nodeName: 'rect';
  className: 'SvgRect';
  dom: SVGRectElement;
  declare propObj: ISvgRectProperty;
  x = 0;
  y = 0;
  width = 60;
  height = 60;
  declare childNodes: [];
  constructor(public parent?: TypeSvgSvg) {
    super();
    this.nodeName = 'rect';
    this.className = 'SvgRect';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {},
      attrObj: {
        fill: 'none',
        stroke: '#000',
        strokeWidth: 1,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      }
    };
  }
  // 单位是px
  reset(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.setAttrObj({
      x,
      y,
      width,
      height
    });
  }
}
