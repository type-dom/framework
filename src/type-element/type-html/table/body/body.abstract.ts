import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import type { ITypeTableBody } from './body.interface';

export abstract class TypeTableBody extends TypeHtml implements ITypeTableBody {
  nodeName: 'tbody';
  dom: HTMLTableSectionElement;
  declare childNodes: TypeTableRow[];
  protected constructor() {
    super();
    this.nodeName = 'tbody';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
