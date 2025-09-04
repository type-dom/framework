import { TypeImg } from '../../../../core/components/type-html/img/img.abstract';
import { TypeImgProps } from '../../../../core/components/type-html/img/img.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';
  override props: TypeImgProps;

  override isBasic = true;

  constructor(params: TypeImgProps = {}) {
    super();
    this.className = 'Img';
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
