import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import type { ITypeTableFoot } from './foot.interface';
export abstract class TypeTableFoot extends TypeHtml implements ITypeTableFoot {
  nodeName: 'tfoot';
  dom: HTMLElement;
  declare childNodes: TypeTableRow[];
  protected constructor() {
    super();
    this.nodeName = 'tfoot';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
