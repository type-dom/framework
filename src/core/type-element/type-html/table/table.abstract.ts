import { TypeHtml } from '../type-html.abstract';
import type { ITypeTable } from './table.interface';

export abstract class TypeTable extends TypeHtml implements ITypeTable {
  nodeName: 'table';
  dom: HTMLTableElement;

  protected constructor() {
    super();
    this.nodeName = 'table';
    this.dom = document.createElement(this.nodeName);
  }
}
