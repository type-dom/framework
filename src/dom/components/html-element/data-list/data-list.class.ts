import { TypeDataList } from '../../../../core/abstracts/type-html/data-list/data-list.abstract';
import { DataListProps } from '../../../../core/abstracts/type-html/data-list/data-list.interface';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';
  constructor(params: DataListProps = {}) {
    super(params);
    this.className = 'DataList';
  }
}
