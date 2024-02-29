import { TypeHtml } from '../type-html.abstract';
import type { ITypeInput } from './input.interface';
export abstract class TypeInput extends TypeHtml implements ITypeInput {
  nodeName: 'input';
  dom: HTMLInputElement;
  protected constructor() {
    super();
    this.nodeName = 'input';
    this.dom = document.createElement(this.nodeName);
  }
}
