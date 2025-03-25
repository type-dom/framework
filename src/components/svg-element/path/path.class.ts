import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { TypeSvgSvg } from '../../../core/type-svg/svg/svg.abstract';
import { ISvgPath, SvgPathProps } from './path.interface';

export class SvgPath extends TypeSvg implements ISvgPath {
  nodeName: 'path';
  dom: SVGPathElement;
  className: 'SvgPath';
  override props: SvgPathProps;
  override parent?: TypeSvgSvg;
  // override attrObj: ISvgPathAttribute;
  override childNodes: [];

  override isBasic = true;

  constructor(params: SvgPathProps = {}) {
    super();
    this.nodeName = 'path';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.className = 'SvgPath';
    this.attr.addObj({ d: params.attrObj?.d ?? '' });
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  get pathData(): string {
    return this.attr.get('d') ?? '';
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
    this.attr.add('d', rest.join(' '));
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
    this.attr.addObj({
      fill: color,
    });
  }
}
