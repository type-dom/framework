import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypePicture } from '../../../core/type-html/picture/picture.abstract';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Picture';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
