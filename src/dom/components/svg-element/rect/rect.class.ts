import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/components/type-svg/type-svg.abstract';
import { addAttrObj, setAttrObj } from '../../../modules/attribute';
import { ISvgRect } from './rect.interface';

export class SvgRect extends TypeSvg implements ISvgRect {
  nodeName: 'rect';
  className: 'SvgRect';
  dom: SVGRectElement;
  override props: SvgProps;
  // override attrObj: ISvgRectAttribute;
  override childNodes: [];
  x: number | string = 0;
  y : number | string= 0;
  width: number | string = 60;
  height: number | string = 60;

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.nodeName = 'rect';
    this.className = 'SvgRect';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    addAttrObj(this, {
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
  reset(x: number | string, y: number | string, width: number | string, height: number | string): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    setAttrObj(this, {
      x,
      y,
      width,
      height,
    });
  }
}
