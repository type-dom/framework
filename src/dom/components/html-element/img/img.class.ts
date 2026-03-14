import { TypeImg } from '../../../../core/abstracts/type-html/img/img.abstract';
import { ImgProps } from '../../../../core/abstracts/type-html/img/img.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  constructor(params: ImgProps = {}) {
    super(params);
    this.className = 'Img';
  }
}
