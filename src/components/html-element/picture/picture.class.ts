import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypePicture } from '../../../core/type-html/picture/picture.abstract';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Picture';
    this.useParams(params);
  }
}
