import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeQ } from '../../../core/type-html/q/q.abstract';
import type { IQ } from './q.interface';

export class Q extends TypeQ implements IQ {
  className: 'Q';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Q';
    this.useParams(params);
  }
}
