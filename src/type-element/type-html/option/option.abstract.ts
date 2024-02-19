import { TypeHtml } from '../type-html.abstract';
import type { ITypeOption } from './option.interface';
export abstract class TypeOption extends TypeHtml implements ITypeOption {
  nodeName: 'option';
  dom: HTMLOptionElement;
  protected constructor() {
    super();
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
  }
}
