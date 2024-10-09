import { TypeSvg } from '../../../core/type-svg/type-svg.abstract';
import type {
  ISvgEllipse,
  ISvgEllipseConfig,
} from './ellipse.interface';

export class SvgEllipse extends TypeSvg implements ISvgEllipse {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  override props: ISvgEllipseConfig;
  // override attrObj: ISvgEllipseAttribute;
  override childNodes: [];
  cx = 0;
  cy = 0;
  rx = 0;
  ry = 0;

  constructor(params?: ISvgEllipseConfig) {
    super();
    this.nodeName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      this.nodeName
    );
    this.childNodes = [];
    this.attr.addObj({
      fill: 'none',
      stroke: '#000',
      strokeWidth: 1,
      cx: this.cx,
      cy: this.cy,
      rx: this.rx,
      ry: this.ry,
    });
    this.props = this.useParams(params);
  }

  reset(cx: number, cy: number, rx: number, ry: number): SvgEllipse {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.attr.setObj({
      cx,
      cy,
      rx,
      ry,
    });
    return this;
  }
}
