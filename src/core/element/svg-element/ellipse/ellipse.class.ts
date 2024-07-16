import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import type {
  ISvgEllipse,
  ISvgEllipseAttribute,
  ISvgEllipseConfig
} from './ellipse.interface';

export class SvgEllipse extends TypeSvg implements ISvgEllipse {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  override attrObj: ISvgEllipseAttribute;
  override childNodes: [];
  cx = 0;
  cy = 0;
  rx = 0;
  ry = 0;

  constructor(config?: ISvgEllipseConfig) {
    super();
    this.nodeName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attrObj = {
      fill: 'none',
      stroke: '#000',
      strokeWidth: 1,
      cx: this.cx,
      cy: this.cy,
      rx: this.rx,
      ry: this.ry
    };
    this.setConfig(config);
  }

  reset(cx: number, cy: number, rx: number, ry: number): SvgEllipse {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.setAttrObj({
      cx,
      cy,
      rx,
      ry
    });
    return this;
  }
}
