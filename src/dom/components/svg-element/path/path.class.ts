import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { addAttrProp, addAttrObj, SVGAttributes } from '../../../modules/attribute';
import { ISvgPath } from './path.interface';

export class SvgPath extends TypeSvg implements ISvgPath {
  nodeName: 'path';
  dom: SVGPathElement;
  className: 'SvgPath';
  // override attrObj: ISvgPathAttribute;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'path';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.className = 'SvgPath';
    this.childNodes = [];
    transformSlot(this, params.slot);
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
