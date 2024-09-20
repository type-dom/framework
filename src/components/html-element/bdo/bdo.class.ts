import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeBdo } from '../../../core/type-html/bdo/bdo.abstract';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Bdo';
    this.useParams(params);
  }
}
