import { TypePicture } from '../../../../core/components/type-html/picture/picture.abstract';
import { TypePictureProps } from '../../../../core/components/type-html/picture/picture.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  override isBasic = true;

  constructor(params: TypePictureProps = {}) {
    super();
    this.className = 'Picture';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
