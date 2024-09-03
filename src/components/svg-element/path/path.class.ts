import { TypeSvg } from '../../type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../type-svg/svg/svg.abstract';
import { ISvgPath, ISvgPathAttribute, ISvgPathConfig } from './path.interface';

export class SvgPath extends TypeSvg implements ISvgPath {
  nodeName: 'path';
  dom: SVGPathElement;
  className: 'SvgPath';
  override props: ISvgPathConfig;
  override parent?: TypeSvgSvg;
  // override attrObj: ISvgPathAttribute;
  override childNodes: [];

  constructor(params?: ISvgPathConfig) {
    super();
    this.nodeName = 'path';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.className = 'SvgPath';
    this.ctrl.addAttrObj({
      d: '',
    });
    this.childNodes = [];
    this.props = this.setParams(params);
  }

  get pathData(): string {
    return this.props.attrObj?.d as string ?? '';
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
    this.ctrl.addAttribute('d', rest.join(' '));
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
    this.ctrl.addAttrObj({
      fill: color,
    });
  }
}
