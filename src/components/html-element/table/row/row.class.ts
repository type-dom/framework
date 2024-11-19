import { TypeTableRow } from '../../../../core/type-html/table/row/row.abstract';
import { ITypeConfig } from '../../../../core/type-node/type-node.interface';
import { SlotNode } from '../../../slot-node/slot-node.class';
import { TableDataCell } from '../data-cell/data-cell.class';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  slotNode: SlotNode;
  override childNodes: TableDataCell[];

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'TableRow';
    this.slotNode = new SlotNode();
    this.childNodes = [];

    if (params?.slot) {
      this.slotChild(params.slot);
      // this.slotNode.addSlot(params.slot);
    }
    this.useParams(params);
  }
}
