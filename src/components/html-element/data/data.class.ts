import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeData } from '../../../core/type-html/data/data.abstract';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Data';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
