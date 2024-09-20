import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeUL } from '../../../core/type-html/ul/ul.abstract';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'UL';
    this.useParams(params);
  }
}
