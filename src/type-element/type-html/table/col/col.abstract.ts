import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCol } from './col.interface';
export abstract class TypeTableCol extends TypeHtml implements ITypeTableCol {
  nodeName: 'col';
  dom: HTMLTableColElement;
  protected constructor() {
    super();
    this.nodeName = 'col';
    this.dom = document.createElement(this.nodeName);
  }
}
