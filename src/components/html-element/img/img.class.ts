import { TypeImg } from '../../../core/type-html/img/img.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Img';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
