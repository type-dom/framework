import { TypeTableCaption } from '../../../../type-element/type-html/table/caption/caption.abstract';
import { Table } from '../table.class';
import type { ITableCaption } from './caption.interface';

export class TableCaption extends TypeTableCaption implements ITableCaption {
  className: 'TableCaption';

  constructor(public override parent: Table) {
    super();
    this.className = 'TableCaption';
    this.childNodes = [];
  }
}
