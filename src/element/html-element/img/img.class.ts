import { TypeImg } from '../../../type-element/type-html/img/img.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Img';
  }
}
