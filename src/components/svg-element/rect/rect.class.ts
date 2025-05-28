import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import { ISvgRect, SvgRectProps } from './rect.interface';

export class SvgRect extends TypeSvg implements ISvgRect {
  nodeName: 'rect';
  className: 'SvgRect';
  dom: SVGRectElement;
  override props: SvgRectProps;
  // override attrObj: ISvgRectAttribute;
  override childNodes: [];
  x = 0;
  y = 0;
  width = 60;
  height = 60;

  override isBasic = true;

  constructor(params: SvgRectProps = {}) {
    super();
    this.nodeName = 'rect';
    this.className = 'SvgRect';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attr.addObj({
      // fill: 'none',
      // stroke: '#000',
      strokeWidth: 1,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    });
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  // 单位是px
  reset(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.attr.setObj({
      x,
      y,
      width,
      height,
    });
  }
}
