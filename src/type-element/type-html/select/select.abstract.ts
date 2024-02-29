import { TypeHtml } from '../type-html.abstract';
import type { ITypeSelect } from './select.interface';
export abstract class TypeSelect extends TypeHtml implements ITypeSelect {
  nodeName: 'select';
  dom: HTMLSelectElement;
  protected constructor() {
    super();
    this.nodeName = 'select';
    this.dom = document.createElement(this.nodeName);
  }
}
