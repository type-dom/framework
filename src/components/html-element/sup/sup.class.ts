import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSup } from '../../../core/type-html/sup/sup.abstract';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Sup';
    this.useParams(params);
  }
}
