import { TypeForm } from '../../../../core/abstracts/type-html/form/form.abstract';
import { FormProps } from '../../../../core/abstracts/type-html/form/form.interface';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';
  constructor(params: FormProps = {}) {
    super(params);
    this.className = 'Form';
  }
}
