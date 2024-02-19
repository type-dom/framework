import { TypeHtml } from '../type-html.abstract';
import type { ITypeForm } from './form.interface';
export abstract class TypeForm extends TypeHtml implements ITypeForm {
  nodeName: 'form';
  dom: HTMLFormElement;
  protected constructor() {
    super();
    this.nodeName = 'form';
    this.dom = document.createElement(this.nodeName);
  }
}
