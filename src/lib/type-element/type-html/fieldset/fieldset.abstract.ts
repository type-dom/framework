import { TypeHtml } from '../type-html.abstract';
import type { ITypeFieldset } from './fieldset.interface';

export abstract class TypeFieldset extends TypeHtml implements ITypeFieldset {
  nodeName: 'fieldset';
  dom: HTMLFieldSetElement;

  protected constructor() {
    super();
    this.nodeName = 'fieldset';
    this.dom = document.createElement(this.nodeName);
  }
}
