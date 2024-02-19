import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import type { ISvgPath, ISvgPathProperty } from './path.interface';
export class SvgPath extends TypeSvg implements ISvgPath {
  nodeName: 'path';
  dom: SVGPathElement;
  className: 'SvgPath';
  declare propObj: ISvgPathProperty;
  declare childNodes: [];
  constructor(public parent: TypeSvgSvg) {
    super();
    this.nodeName = 'path';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.className = 'SvgPath';
    this.propObj = {
      styleObj: {},
      attrObj: {
        d: ''
      }
    };
    this.childNodes = [];
  }
  get pathData(): string {
    return this.attrObj.d as string || '';
  }
  /**
   * 添加相关值，不渲染；
   * @param rest
   */
  setData(...rest: string[]): void {
    this.addData(...rest);
    this.renderData(...rest);
  }
  addData(...rest: string[]): void {
    this.addAttribute('d', rest.join(' '));
  }
  renderData(...rest: string[]): void {
    this.dom.setAttribute('d', rest.join(' '));
  }
  /**
   * color  #ffffff
   * 不直接渲染的。
   * @param color
   */
  setFill(color: string) {
    this.addAttrObj({
      fill: color
    });
  }
}
