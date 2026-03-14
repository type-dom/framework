import { TypePicture } from '../../../../core/abstracts/type-html/picture/picture.abstract';
import { PictureProps } from '../../../../core/abstracts/type-html/picture/picture.interface';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';
  constructor(params: PictureProps = {}) {
    super(params);
    this.className = 'Picture';
  }
}
