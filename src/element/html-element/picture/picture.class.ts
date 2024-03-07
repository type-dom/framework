import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypePicture } from '../../../type-element/type-html/picture/picture.abstract';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Picture';
  }
}
