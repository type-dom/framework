import { TypeImg } from '../../../type-element/type-html/img/img.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IImg } from './img.interface';
export class Img extends TypeImg implements IImg {
  className: 'Img';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Img';
  }
}
