import { addAttrObj, setAttrObj } from '../../../../dom/modules/attribute';
import { TypeSvg } from '../type-svg.abstract';
import type { ITypeSvgSvg } from './svg.interface';

export abstract class TypeSvgSvg extends TypeSvg implements ITypeSvgSvg {
  nodeName: 'svg';
  dom: SVGSVGElement;
  override childNodes: TypeSvg[];
  width: string | number = '100%';
  height: string | number = '100%';

  constructor()  {
    super();
    this.nodeName = 'svg';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    addAttrObj(this, {
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      width: this.width,
      height: this.height
      // viewBox: '0 0 1024 1024'
    });
    this.childNodes = [];
  }

  resetSize(width: string | number, height: string | number): void {
    setAttrObj(this, {
      width,
      height
    });
  }
}
