import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDataList } from '../../../type-element/type-html/data-list/data-list.abstract';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'DataList';
  }
}
