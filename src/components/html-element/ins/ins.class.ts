import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeIns } from '../../../core/type-html/ins/ins.abstract';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Ins';
    this.useParams(params);
  }
}
