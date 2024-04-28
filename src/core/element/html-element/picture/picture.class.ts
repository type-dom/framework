import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypePicture } from '../../../type-element/type-html/picture/picture.abstract';
import type { IPicture } from './picture.interface';

export class Picture extends TypePicture implements IPicture {
  className: 'Picture';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Picture';
    this.setConfig(config);
  }
}
