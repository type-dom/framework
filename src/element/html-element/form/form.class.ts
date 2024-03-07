import { TypeForm } from '../../../type-element/type-html/form/form.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Form';
  }
}
