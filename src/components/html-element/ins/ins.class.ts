import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeIns } from '../../../core/type-html/ins/ins.abstract';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Ins';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
