import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import { ISvgRect, ISvgRectProperty } from './rect.interface';
export class SvgRect extends TypeSvg implements ISvgRect {
  nodeName: 'rect';
  className: 'SvgRect';
  dom: SVGRectElement;
  propObj: ISvgRectProperty;
  childNodes: [];
  width = 60;
  height = 60;
  constructor(public parent: TypeSvgSvg) {
    super('rect');
    this.nodeName = 'rect';
    this.className = 'SvgRect';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        fill: 'rgb(255, 255, 255)',
        strokeWidth: 1,
        stroke: 'rgb(0, 0, 0)',
      },
      attrObj: {
        width: this.width,
        height: this.height
      }
    };
  }

  /**
   * 重置
   * @param x
   * @param y
   * @param width
   * @param height
   */
  reset(x: string | number, y : string | number, width: string | number, height: string | number): void {
    this.setAttrObj({
      x,
      y,
      width,
      height
    });
  }
}
