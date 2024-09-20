import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDataList } from '../../../core/type-html/data-list/data-list.abstract';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'DataList';
    this.useParams(params);
  }
}
