import { TypeHtml } from '../../type-html.abstract';
import { TypeTableDataCell } from '../data-cell/data-cell.abstract';
import type { ITypeTableRow } from './row.interface';

export abstract class TypeTableRow extends TypeHtml implements ITypeTableRow {
  nodeName: 'tr';
  dom: HTMLTableRowElement;
  override childNodes: TypeTableDataCell[];

  protected constructor() {
    super();
    // console.log('trData is ', trData);
    this.nodeName = 'tr';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
