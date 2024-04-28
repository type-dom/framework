import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeRt } from '../../../type-element/type-html/rt/rt.abstract';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Rt';
    this.setConfig(config);
  }
}
