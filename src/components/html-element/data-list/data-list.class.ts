import { TypeDataList } from '../../../core/type-html/data-list/data-list.abstract';
import { TypeDataListProps } from '../../../core/type-html/data-list/data-list.interface';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  override isBasic = true;

  constructor(params: TypeDataListProps = {}) {
    super();
    this.className = 'DataList';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
