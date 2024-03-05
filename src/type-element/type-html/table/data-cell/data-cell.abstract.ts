import { TypeHtml } from '../../type-html.abstract';
import type { ITypeTableDataCell } from './data-cell.interface';

export abstract class TypeTableDataCell
  extends TypeHtml
  implements ITypeTableDataCell
{
  nodeName: 'td';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'td';
    this.dom = document.createElement(this.nodeName);
  }
}
