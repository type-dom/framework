import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvg } from '../../../../core/abstracts/type-svg/type-svg.abstract';
import { addAttrObj, setAttrObj } from '../../../modules/attribute';
import { ISvgRect } from './rect.interface';

export class SvgRect extends TypeSvg implements ISvgRect {
  nodeName: 'rect';
  className: 'SvgRect';
  dom: SVGRectElement;
  // override attrObj: ISvgRectAttribute;
  override childNodes: [];
  x: number | string = 0;
  y : number | string= 0;
  width: number | string = 60;
  height: number | string = 60;


  constructor(params: SvgProps = {}) {
    super(params);
    this.nodeName = 'rect';
    this.className = 'SvgRect';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
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
