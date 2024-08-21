import { TypeTableDataCell } from '../../../../type-html/table/data-cell/data-cell.abstract';
import { ITypeConfig } from '../../../../type-node/type-node.interface';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';

  constructor(public override config: ITypeConfig) {
    super();
    this.className = 'TableDataCell';
    // this.childNodes = [];
    this.setConfig(config);
  }
}
