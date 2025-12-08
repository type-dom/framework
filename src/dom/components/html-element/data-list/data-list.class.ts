import { TypeDataList } from '../../../../core/components/type-html/data-list/data-list.abstract';
import { DataListProps } from '../../../../core/components/type-html/data-list/data-list.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  override isBasic = true;

  constructor(params: DataListProps = {}) {
    super(params);
    this.className = 'DataList';
    transformSlot(this, params.slot);
  }
}
