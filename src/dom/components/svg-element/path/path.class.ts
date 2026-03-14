import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { addAttrProp, addAttrObj, SVGAttributes } from '../../../modules/attribute';
import { ISvgPath } from './path.interface';

export class SvgPath extends TypeSvg implements ISvgPath {
  dom: SVGPathElement;
  className: 'SvgPath';
  // override attrObj: ISvgPathAttribute;
  override childNodes: [];
  constructor(params: SvgProps = {}) {
    super(params);
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.className = 'SvgPath';
    this.childNodes = [];
  }

  get pathData(): string {
    return (this.attrObj as SVGAttributes).d ?? '';
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
    addAttrProp(this, 'd', rest.join(' '));
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
    addAttrObj(this, {
      fill: color,
    });
  }
}
