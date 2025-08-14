import { TypeImg } from '../../../core/type-html/img/img.abstract';
import { TypeImgProps } from '../../../core/type-html/img/img.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';
  override props: TypeImgProps;

  override isBasic = true;

  constructor(params: TypeImgProps = {}) {
    super();
    this.className = 'Img';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
