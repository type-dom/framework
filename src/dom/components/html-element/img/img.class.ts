import { TypeImg } from '../../../../core/components/type-html/img/img.abstract';
import { ImgProps } from '../../../../core/components/type-html/img/img.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';
  override isBasic = true;

  constructor(params: ImgProps = {}) {
    super(params);
    this.className = 'Img';
    transformSlot(this, params.slot);
  }
}
