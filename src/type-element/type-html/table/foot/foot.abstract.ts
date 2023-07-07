import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import { ITypeTableFoot } from './foot.interface';
export abstract class TypeTableFoot extends TypeHtml implements ITypeTableFoot {
  nodeName: 'tfoot';
  dom: HTMLElement;
  childNodes: TypeTableRow[];
  protected constructor() {
    super('tfoot');
    this.nodeName = 'tfoot';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
