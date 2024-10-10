import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeS } from '../../../core/type-html/s/s.abstract';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'S';
    this.useParams(params);
  }
}
