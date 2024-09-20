import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeRt } from '../../../core/type-html/rt/rt.abstract';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Rt';
    this.useParams(params);
  }
}
