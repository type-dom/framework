import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeQ } from '../../../core/type-html/q/q.abstract';
import type { IQ } from './q.interface';

export class Q extends TypeQ implements IQ {
  className: 'Q';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Q';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
