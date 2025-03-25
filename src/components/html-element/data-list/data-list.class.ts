import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDataList } from '../../../core/type-html/data-list/data-list.abstract';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'DataList';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
