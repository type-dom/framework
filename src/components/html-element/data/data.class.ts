import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeData } from '../../../core/type-html/data/data.abstract';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Data';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
