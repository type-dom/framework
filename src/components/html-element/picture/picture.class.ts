import { TypePicture } from '../../../core/type-html/picture/picture.abstract';
import { TypePictureProps } from '../../../core/type-html/picture/picture.interface';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  override isBasic = true;

  constructor(params: TypePictureProps = {}) {
    super();
    this.className = 'Picture';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
