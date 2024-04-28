import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeDataList } from '../../../type-element/type-html/data-list/data-list.abstract';
import type { IDataList } from './data-list.interface';

export class DataList extends TypeDataList implements IDataList {
  className: 'DataList';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'DataList';
    this.setConfig(config);
  }
}
